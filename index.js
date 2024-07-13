const path = require('path');
const Terser = require('terser');

class webpackConcatjsPlugin {
  constructor(options) {
    this.options = Array.isArray(options) ? options : [options];
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('webpackConcatjsPlugin', async (compilation, callback) => {
      try {
        for (const config of this.options) {
          const { src, dist, minify } = config;
          let content = '';

          // Read and concatenate all source files
          for (const file of src) {
            const filePath = path.resolve(compiler.context, file);
            const fileContent = compilation.inputFileSystem.readFileSync(filePath, 'utf-8');
            content += fileContent + '\n';
          }

          // Minify if the option is set
          if (minify) {
            const minified = Terser.minify(content);
            if (minified.error) {
              throw minified.error;
            }
            content = minified.code;
          }

          // Write the concatenated (and possibly minified) content to the dist file
          const outputFilePath = path.relative(compiler.outputPath, path.resolve(compiler.context, dist));
          compilation.assets[outputFilePath] = {
            source: () => content,
            size: () => content.length,
          };
        }

        callback();
      } catch (err) {
        compilation.errors.push(new Error('webpackConcatjsPlugin: ' + err.message));
        callback();
      }
    });
  }
}

module.exports = webpackConcatjsPlugin;
