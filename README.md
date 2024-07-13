https://www.npmjs.com/package/webpack-concatjs-plugin
https://github.com/cengizilhan/webpack-concatjs-plugin

# webpack-concatjs-plugin

webpack-concatjs-plugin is a custom Webpack plugin that concatenates JavaScript files into a single output file.

## Installation

Install the plugin via npm:

```bash
npm install webpack-concatjs-plugin --save-dev
```
## Usage

In your Webpack configuration file (`webpack.config.js`), require the plugin and add it to the plugins array:


```
const  webpack  =  require('webpack');

const  webpackConcatjsPlugin  =  require('webpack-concatjs-plugin');

  

module.exports  = {

// ... other configuration options

plugins: [

new  webpackConcatjsPlugin([

{

src: [

'./Static/src/scripts/js1.js',

'./Static/src/scripts/js2.js',

'./Static/src/scripts/js3.js',

],

dist:  './Static/dist/scripts/concat-app.js', // Destination file

minify:  false, // Minify the concatenated file

}

]),

// other plugins

],

// ... other configuration options

};
```