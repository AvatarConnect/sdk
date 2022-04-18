# @avatarconnect/sdk [![](https://badge.fury.io/js/@avatarconnect/sdk.svg)](https://npmjs.org/package/@avatarconnect/sdk)

The JavaScript sdk for integrating AvatarConnect into your web-based metaverse

## Installing

Via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@avatarconnect/sdk/dist/index.js"></script>
```

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

// Display the AvatarConnect modal
connector.enable()

connector.on('close', handleClose)
connector.on('error', handleError)

// Pass the result into the AvatarConnect plugin for your game engine
connector.on('result', handleResult)

// Hide the AvatarConnect modal
connector.disable()
```

## API

```javascript
new AvatarConnect(<providers>[, <options>])
```

### Providers

Check out our docs for more info on provider configurations

### Options

| Option          | Description                                                                                                          | Default                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **`bridgeUrl`** | Pass in a custom url for your own hosted version of [@avatarconnect/bridge](https://github.com/AvatarConnect/bridge) | `https://v0.avatarconnect.org` |
| **`maxHeight`** | Max height of the modal's content (in pixels)                                                                        | `600`                          |
| **`maxWidth`**  | Max width of the modal's content (in pixels)                                                                         | `800`                          |
| **`padding`**   | The padding on the sides of the modal at full width (in pixels)                                                      | `6`                            |
