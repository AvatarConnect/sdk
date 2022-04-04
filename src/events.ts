export const OutboundEvents = {
  /** Sent with user configuration options */
  CONFIGURE: 'configure',
}

export const BridgeEvents = {
  /** Triggered when an error occurs in the iframe */
  ERROR: 'error',

  /** Triggered when the iframe is ready to receive messages */
  IFRAME_MOUNTED: 'mounted',

  /** Triggered when a result is received */
  RESULT: 'result',
}

export const ResponseEvents = {
  /** Triggered when an error occurs in the iframe */
  ERROR: 'error',

  /** Triggered when the avatar info is received */
  RESULT: 'result',
}
