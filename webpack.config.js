const path = require('path')
const pkg = require('./package.json')

const MAJOR_VERSION = pkg.version.split('.')[0]

const getConfig = ({ rules = [], ...config }) => ({
  ...config,
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      ...rules,
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
})

module.exports = [
  getConfig({
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      globalObject: 'this',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
    },
    rules: [
      {
        test: /index\.ts$/,
        loader: 'string-replace-loader',
        options: {
          search: '__WEBPACK_VERSION_STUB__',
          replace: MAJOR_VERSION,
        },
      },
    ],
  }),
]
