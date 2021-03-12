const path = require('path');

const root = path.resolve(__dirname, '..');
const input = path.resolve(root, 'src/main.ts');
const output = path.resolve(root, 'build/action');

console.dir({
  directories: {
    root,
    input,
    output,
  },
})

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  target: 'node',

  entry: {
    main: input,
  },

  output: {
    path: output,
    filename: 'main.js',
    clean: true,
  },

  // resolve: {
  //   fallback: {
  //     fs: false,
  //     os: false,
  //     path: false,
  //   },
  // },

  optimization: {
    minimize: true,
    usedExports: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },

      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
