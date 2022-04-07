import { EventEmitter } from 'events'

import Bridge from './bridge'
import { AvatarConnectError } from './errors'
import { BridgeEvents, OutboundEvents, ResponseEvents } from './events'
import {
  BridgeError,
  BridgeResult,
  BridgeEvent,
  SdkConfiguration,
} from './types'

const MAJOR_VERSION = '__WEBPACK_VERSION_STUB__'
const DEFAULT_BRIDGE_URL = `https://v${MAJOR_VERSION}.avatarconnect.org`

class AvatarConnect extends EventEmitter {
  private readonly bridgeUrl: string
  private readonly configuration: SdkConfiguration
  private readonly bridge: Bridge

  constructor(providers = [], { bridgeUrl = DEFAULT_BRIDGE_URL } = {}) {
    super()
    if (!window)
      throw new AvatarConnectError(
        'This cannot be used in a non-browser context'
      )
    this.bridgeUrl = bridgeUrl
    this.bridge = new Bridge({ bridgeUrl })
    this.bridge.on('close', () => {
      this.emit(ResponseEvents.CLOSE)
      this.close()
    })
    this.configuration = { providers }
  }

  public enable(): void {
    window.addEventListener('message', this.handleMessage.bind(this))
    this.bridge.open()
  }

  public close(): void {
    window.removeEventListener('message', this.handleMessage.bind(this))
    this.bridge.close()
  }

  private setAvatar(params: BridgeResult): void {
    this.emit(ResponseEvents.RESULT, params)
    this.close()
  }

  private handleMessage({ data, origin }: MessageEvent): void {
    if (origin !== this.bridgeUrl) return
    const { event, params, sender } = this.parseMessage(data)
    if (sender !== '@avatarconnect/bridge') return
    switch (event) {
      case BridgeEvents.IFRAME_MOUNTED:
        return this.bridge.sendMessage(
          OutboundEvents.CONFIGURE,
          this.configuration
        )
      case BridgeEvents.DEBUG:
        // @ts-expect-error debug params are an array
        // eslint-disable-next-line no-console
        console.log(...params)
        return
      case BridgeEvents.ERROR:
        this.emit(ResponseEvents.ERROR, params as BridgeError)
        return
      case BridgeEvents.CLOSE:
        this.emit(ResponseEvents.CLOSE)
        return this.close()
      case BridgeEvents.RESULT:
        return this.setAvatar(params as BridgeResult)
    }
  }

  private parseMessage(data: string): BridgeEvent {
    try {
      return JSON.parse(data)
    } catch (error) {
      return {
        event: 'ignore',
        params: null,
        sender: 'none',
      }
    }
  }
}

export default AvatarConnect
