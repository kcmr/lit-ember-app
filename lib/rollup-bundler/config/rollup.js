/* eslint-env node */
'use strict';

const babel = require("rollup-plugin-babel");
const resolver = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const includePaths = require('rollup-plugin-includepaths');
const babelConfig = require('./babel');

module.exports = function({
  entrypoint = 'module-imports.js',
  outputfile = 'assets/bundle.js',
  targets = [],
  root = ''
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
        commonjs(),
        includePaths({
          paths: [root]
        }),
        babel(babelConfig(targets).legacy)
      ]
    }
  }
};
