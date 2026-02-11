import path from 'path';

export default {
  entry: './src/dropdown.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    library: 'Dropdown',
    libraryTarget: 'module'
  },
  experiments: {
    outputModule: true
  },
  module: {
    rules: []
  }
};