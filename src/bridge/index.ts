/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { EventEmitter } from 'events'

import { AvatarConnectError } from '../errors'

import styles, { TRANSITION_LONG, TRANSITION_SHORT } from './styles'

interface BridgeConfiguration {
  bridgeUrl: string
}

const createElement = (
  tag: string,
  className?: string,
  options: object = {}
): HTMLElement => {
  const element = document.createElement(tag)
  if (className) element.classList.add(className)
  for (const [attribute, value] of Object.entries(options)) {
    // @ts-expect-error This is just assigning attributes
    element[attribute] = value
  }
  return element
}

class Bridge extends EventEmitter {
  private iframeReference?: HTMLIFrameElement
  private modalReference?: HTMLDivElement
  private modalContentReference?: HTMLDivElement
  private modalOverlayReference?: HTMLDivElement
  private spinnerReference?: HTMLDivElement
  private readonly bridgeUrl: string

  constructor({ bridgeUrl }: BridgeConfiguration) {
    super()
    this.bridgeUrl = bridgeUrl
    this.loadStylesheet()
  }

  public open(): void {
    this.createModal()
    this.createModalOverlay()
    this.createModalContent()
    this.createSpinner()
    this.createIframe()
    const body = document.querySelector('body')
    body?.appendChild(this.modalReference!)

    // Allow DOM elements to render, then add opacity
    requestAnimationFrame(() => {
      this.modalContentReference!.style.opacity = '100%'
      this.modalOverlayReference!.style.opacity = '75%'
    })

    // Reverse transition order so content fades first
    setTimeout(() => {
      this.modalContentReference!.style[
        // @ts-expect-error valid css
        'transition-duration'
      ] = `${TRANSITION_SHORT}ms`
      this.modalOverlayReference!.style[
        // @ts-expect-error valid css
        'transition-duration'
      ] = `${TRANSITION_LONG}ms`
    }, TRANSITION_LONG)
  }

  public close(): void {
    if (!this.modalReference) return
    this.modalOverlayReference?.removeEventListener(
      'click',
      this.close.bind(this)
    )
    this.modalContentReference!.style.opacity = '0'
    this.modalOverlayReference!.style.opacity = '0'
    const body = document.querySelector('body')
    setTimeout(() => {
      if (!this.modalReference) return
      body?.removeChild(this.modalReference)
      this.modalReference = undefined
      this.modalOverlayReference = undefined
      this.modalContentReference = undefined
      this.spinnerReference = undefined
      this.iframeReference = undefined
      this.emit('close')
    }, TRANSITION_LONG)
  }

  public sendMessage(method: string, params: unknown): void {
    if (!this.iframeReference) return
    if (!this.iframeReference.contentWindow)
      throw new AvatarConnectError(`The iframe hasn't been rendered yet`)
    this.iframeReference.contentWindow.postMessage(
      JSON.stringify({ method, params, sender: '@avatarconnect/sdk' }),
      '*'
    )
  }

  private loadStylesheet(): void {
    const head = document.head || document.getElementsByTagName('head')[0]
    const style = document.createElement('style')
    head.appendChild(style)
    style.type = 'text/css'
    style.appendChild(document.createTextNode(styles))
  }

  private createModal(): void {
    this.modalReference = createElement(
      'div',
      'avatarconnect__modal'
    ) as HTMLDivElement
  }

  private createModalOverlay(): void {
    this.modalOverlayReference = createElement(
      'div',
      'avatarconnect__modal__overlay',
      { 'aria-hidden': true }
    ) as HTMLDivElement
    this.modalOverlayReference.addEventListener('click', this.close.bind(this))
    this.modalReference?.appendChild(this.modalOverlayReference)
  }

  private createModalContent(): void {
    this.modalContentReference = createElement(
      'div',
      'avatarconnect__modal__content'
    ) as HTMLDivElement
    this.modalReference?.appendChild(this.modalContentReference)
  }

  private createSpinner(): void {
    this.spinnerReference = createElement(
      'div',
      'avatarconnect__spinner'
    ) as HTMLDivElement
    new Array(12).fill(null).forEach(() => {
      this.spinnerReference?.appendChild(createElement('div'))
    })
    this.modalContentReference?.appendChild(this.spinnerReference)
  }

  private createIframe(): void {
    this.iframeReference = createElement('iframe', 'avatarconnect__iframe', {
      allow: 'camera *; microphone *',
      src: this.bridgeUrl,
    }) as HTMLIFrameElement
    this.modalContentReference?.appendChild(this.iframeReference)
  }
}

export default Bridge
