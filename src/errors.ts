export class AvatarConnectError extends Error {
  constructor(message: string) {
    super(`[@avatarconnect/sdk] ${message}`)
    Error.captureStackTrace(this, this.constructor)
  }
}
