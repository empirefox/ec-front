const babel = require('babel-core');
const sources = require('webpack-sources');

/**
 * Applies Babel transforms to output chunks.
 */
module.exports = class OutputBabelPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        let options = this.options;
        compiler.plugin('compilation', compilation => {
            compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
                for (let chunk of chunks) {
                    for (let file of chunk.files) {
                        let source = compilation.assets[file].source();
                      console.log('OutputBabelPlugin',source)
                        let transformed = babel.transform(source, options).code;
                        compilation.assets[file] = new sources.RawSource(transformed);
                    }
                }
                callback();
            });
        });
    }
}