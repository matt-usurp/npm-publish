const path = require('path');

const root = path.resolve(__dirname, '..');

const input = path.resolve(root, 'build/workspace/main.js');
const output = path.resolve(root, 'build/action');

console.dir({
  directories: {
    root,
    input,
    output,
  },
})

module.exports = {
  mode: 'production',
  target: 'node',
  devtool: false,

  entry: {
    main: input,
  },

  output: {
    path: output,
    filename: 'bundle.[name].js',
    clean: true,
  },

  optimization: {
    minimize: false,
    emitOnErrors: true,
    usedExports: true,
    runtimeChunk: {
      name: 'runtime',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },
};
