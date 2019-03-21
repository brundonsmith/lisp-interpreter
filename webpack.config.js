const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.ts",
    output: {
        filename: "bundle.js"
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [ path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules') ],
        // directories where to look for modules
        extensions: [ ".ts", ".js", ".json" ],
    },
    module: {
        rules: [
          { 
              test: /\.ts/, 
              loader: "babel-loader"
          }
        ]
    }
}