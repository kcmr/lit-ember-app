/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const Rollup = require("broccoli-rollup");
const rollupConfig = require('./config/rollup');
const path = require('path');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon: () => true,

  config(env, baseConfig) {
    const options = baseConfig['rollup-bundler'] || {};

    this.options = Object.assign(options, {
      enabled: true,
      rootURL: baseConfig.rootURL,
      entrypoint: 'lit-elements-imports.js',
      outputfile: 'assets/lit-elements-bundle.js',
      includeWebComponentsPolyfill: true
    });
  },

  included(appOrAddon) {
    this._super.included.apply(this, arguments);
    this.app = appOrAddon.app || appOrAddon;

    this._importPolyfills();
  },

  _importPolyfills() {
    if (this.options.includeWebComponentsPolyfill) {
      const webcomponentsbundle = path.join(this.project.root,
        'node_modules',
        '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
      );

      this.app.import(webcomponentsbundle, { options: 'prepend' });
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
      root: `${this.project.root}/app`
    }));

    return mergeTrees([bundle, tree]);
  }
};
