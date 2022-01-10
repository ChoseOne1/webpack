let path = require('path');

let conf = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, '/dist'),
        filename: 'main.js',
        publicPath: './dist'
        
    },
    devServer: {
        static: path.join(__dirname, '/src'),
        compress: true,
        port: 9000,
      }
};

module.exports = conf;