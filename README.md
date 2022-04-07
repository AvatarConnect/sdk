# @avatarconnect/sdk [![](https://badge.fury.io/js/@avatarconnect/sdk.svg)](https://npmjs.org/package/@avatarconnect/sdk)

The JavaScript sdk for integrating AvatarConnect into your web-based metaverse

## Installing

Using npm:

```bash
$ npm install @avatarconnect/sdk
```

Using bower:

```bash
$ bower install @avatarconnect/sdk
```

Using yarn:

```bash
$ yarn add @avatarconnect/sdk
```

## Usage

```javascript
import AvatarConnect from '@avatarconnect/sdk'

const connector = new AvatarConnect([
  ['ready-player-me', { gateway: 'mona' }],
  'crypto-avatars',
  'meebits',
])

connector.enable()

connector.on('close', handleClose)
connector.on('error', handleError)
connector.on('result', handleResult)

connector.disable()
```

## API

```javascript
new AvatarConnect(<providers>[, <options>])
```

### Providers

TODO: Add documentation about providers here

### Options

| Option          | Description                                                                                                          | Default                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **`bridgeUrl`** | Pass in a custom url for your own hosted version of [@avatarconnect/bridge](https://github.com/AvatarConnect/bridge) | `https://v0.avatarconnect.org` |
| **`maxWidth`**  | Max width of the modal's content (in pixels)                                                                         | `600`                          |
| **`maxWidth`**  | Max height of the modal's content (in pixels)                                                                        | `800`                          |
| **`padding`**   | The padding on the sides of the modal at full width (in pixels)                                                      | `6`                            |
