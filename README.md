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

const connector = new AvatarConnect(<iframeElementReference>, {
  'crypto-avatars': true,
  meebits: true,
  'ready-player-me': {
     gatewayName: 'mona'
  },
})

connector.on('error', handleError)

connector.on('result', handleResult)
```

## API

```javascript
new AvatarConnect(<reference to iframe element>, <providers>[, <options>])
```

### Providers

### Options

| Option          | Description                                                                                                          | Default                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| **`bridgeUrl`** | Pass in a custom url for your own hosted version of [@avatarconnect/bridge](https://github.com/AvatarConnect/bridge) | `https://v0.avatarconnect.org` |
