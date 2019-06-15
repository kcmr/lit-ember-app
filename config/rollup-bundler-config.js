'use strict';

const babel = require("rollup-plugin-babel");
const resolver = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

module.exports = function(app, {
  entrypoint = 'lit-elements-imports.js',
  outputfile = 'assets/lit-elements-bundle.js'
} = {}) {
  return {
    rollup: {
      input: entrypoint,
      output: {
        file: outputfile,
        format: 'iife',
        sourcemap: true
      },
      plugins: [
        resolver(),
        commonjs({
          include: 'node_modules/**'
        }),
        babel({
          babelrc: false,
          presets: [
            [
              '@babel/env',
              {
                modules: false,
                targets: app.targets
              }
            ]
          ]
        })
      ]
    }
  }
};
