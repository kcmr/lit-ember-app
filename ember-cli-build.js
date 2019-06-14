'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Rollup = require("broccoli-rollup");
const babel = require("rollup-plugin-babel");
const resolver = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const path = require('path');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
  });

  const litElementsPath = path.join(app.project.root, 'app/lit-elements');
  const entryPoint = path.join(app.project.root, 'app/lit-elements-imports.js');
  const litElements = new Rollup(litElementsPath, {
    inputFiles: ['**/*.js'],
    annotation: 'Bundle Lit Elements',
    rollup: {
      input: entryPoint,
      output: {
        file: 'assets/lit-elements-bundle.js',
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
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree(litElements);
};
