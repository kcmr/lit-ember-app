/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const Rollup = require("broccoli-rollup");
const rollupConfig = require('./config/rollup');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon: () => true,

  config(env, baseConfig) {
    const options = baseConfig[this.name] || {};

    env = env || process.env.EMBER_ENV;
    const isProductionEnv = Boolean(env.match('prod'));
    const url = baseConfig.rootURL || baseConfig.baseURL || '';

    const defaults = {
      enabled: true,
      rootURL: url,
      entrypoint: 'lit-elements-imports.js',
      outputfile: 'assets/lit-elements-bundle.js',
      includeWebComponentsPolyfill: true,
      minify: isProductionEnv
    };

    this.options = Object.assign(defaults, options);
  },

  included(app, parentAddon) {
    this._super.included.apply(this, arguments);
    this.app = parentAddon || app;

    this._importPolyfills();
  },

  _importPolyfills() {
    if (this.options.includeWebComponentsPolyfill) {
      this.app.import(
        'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
        { options: 'prepend' }
      );
    }
  },

  contentFor(type) {
    if (type === 'body-footer') {
      return `<script src="${this.options.rootURL}${this.options.outputfile}"></script>`;
    }
  },

  postprocessTree(type, tree) {
    if (type !== 'all') {
      return tree;
    }

    const entryPointFunnel = new Funnel('app', {
      annotation: 'Rollup entry point',
      files: [this.options.entrypoint]
    });

    const bundle = new Rollup(entryPointFunnel, rollupConfig({
      entrypoint: this.options.entrypoint,
      outputfile: this.options.outputfile,
      targets: this.app.project.targets,
      root: `${this.project.root}/app`,
      minify: this.options.minify
    }));

    return mergeTrees([bundle, tree], {
      overwrite: true,
      annotation: 'Bundle LitElements'
    });
  }
};
