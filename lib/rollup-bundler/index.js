/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const Rollup = require("broccoli-rollup");
const rollupConfig = require('../../config/rollup-bundler-config');
const path = require('path');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon: () => true,

  config(env, baseConfig) {
    const options = baseConfig['rollup-bundler'] || {};

    this.options = Object.assign(options, {
      enabled: true,
      rootURL: baseConfig.rootURL
    });
  },

  included(appOrAddon) {
    this._super.included.apply(this, arguments);
    this.app = appOrAddon.app || appOrAddon;

    const webcomponentsbundle = path.join(
      this.project.root,
      'node_modules',
      '@webcomponents/webcomponentsjs/webcomponents-bundle.js'
    );

    this.app.import(webcomponentsbundle, { options: 'prepend' });
  },

  contentFor(type) {
    if (type === 'body-footer') {
      return `<script src="${this.options.rootURL}assets/lit-elements-bundle.js"></script>`;
    }
  },

  postprocessTree(type, tree) {
    if (type !== 'all') {
      return tree;
    }

    // ToDo: make this configurable
    const litElementsFunnel = new Funnel('app/lit-elements', {
      annotation: 'Lit Elements',
      include: ['**/*.js'],
      destDir: 'lit-elements'
    });

    const entryPointFunnel = new Funnel('app', {
      annotation: 'Rollup entry point',
      files: ['lit-elements-imports.js']
    });

    const mergedTree = mergeTrees([
      litElementsFunnel,
      entryPointFunnel
    ]);

    const bundle = new Rollup(mergedTree, rollupConfig(this.app));

    return mergeTrees([bundle, tree]);
  }
};
