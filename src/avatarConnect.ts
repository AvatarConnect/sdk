import { EventEmitter } from 'events'

import { BridgeEvents, OutboundEvents, ResponseEvents } from './events'

interface SdkConfiguration {
  providers: object
}

const MAJOR_VERSION = '__WEBPACK_VERSION_STUB__'
const DEFAULT_BRIDGE_URL = `https://v${MAJOR_VERSION}.avatarconnect.org`

const createError = (message: string): Error =>
  new Error(`[@avatarconnect/sdk] ${message}`)

class AvatarConnect extends EventEmitter {
  private readonly iframeReference: HTMLIFrameElement
  private readonly bridgeUrl: string
  private readonly configuration: SdkConfiguration

  constructor(
    iframeReference: HTMLIFrameElement,
    providers = {},
    { bridgeUrl = DEFAULT_BRIDGE_URL } = {}
  ) {
    super()
    if (!window)
      throw createError('This cannot be used in a non-browser context')
    if (!iframeReference)
      throw createError('You must provide an iframe reference')
    this.bridgeUrl = bridgeUrl
    this.configuration = { providers }
    this.iframeReference = iframeReference
    this.iframeReference.src = bridgeUrl
    this.iframeReference.allow = 'camera *; microphone *'
    window.addEventListener('message', this._handleMessage)
  }

  send(method: string, params: unknown): void {
    if (!this.iframeReference.contentWindow)
      throw createError(`The iframe hasn't been rendered yet`)
    this.iframeReference.contentWindow.postMessage(
      JSON.stringify({ method, params, sender: '@avatarconnect/sdk' }),
      '*'
    )
  }

  disable(): void {
    window.removeEventListener('message', this._handleMessage)
  }

  private setAvatar(params: unknown): void {
    this.emit(ResponseEvents.RESULT, params)
    this.disable()
  }

  _handleMessage({ data, origin }: MessageEvent): void {
    if (origin !== this.bridgeUrl) return
    const { params, sender, type } = JSON.parse(data)
    if (sender !== '@avatarconnect/bridge') return
    switch (type) {
      case BridgeEvents.IFRAME_MOUNTED:
        return this.send(OutboundEvents.CONFIGURE, this.configuration)
      case BridgeEvents.ERROR:
        this.emit(ResponseEvents.ERROR, params)
        return
      case BridgeEvents.RESULT:
        return this.setAvatar(params)
    }
  }
}

export default AvatarConnect
