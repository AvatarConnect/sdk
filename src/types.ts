interface ConfiguredProviderTuple extends Array<string | object> {
  0: string
  1: object
}

export type Provider = string | ConfiguredProviderTuple

export interface BridgeConfiguration {
  providers: Provider[]
}

export interface SdkOptions {
  bridgeUrl?: string
  maxHeight?: number
  maxWidth?: number
  padding?: number
}

export interface BridgeResult {
  avatar: {
    format: string
    type: string
    uri: string
  }
  metadata: unknown
  provider: string
  version: string
}

export interface BridgeError {
  details: unknown
  message: string
}

export interface BridgeEvent {
  event: string
  params: unknown
  sender: string
}
