'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const Rollup = require("broccoli-rollup");
const rollupConfig = require('./config/rollup-bundler-config');

module.exports = function(defaults) {
  const app = new EmberApp(defaults);

  const litElementsFunnel = new Funnel('app/lit-elements', {
    annotation: 'Lit Elements folder',
    include: ['**/*.js'],
    destDir: 'lit-elements'
  });

  const entryPointFunnel = new Funnel('app', {
    annotation: 'Rollup entry point',
    files: ['lit-elements-imports.js']
  });

  const mergedTree = MergeTrees([
    litElementsFunnel,
    entryPointFunnel
  ]);

  const bundle = new Rollup(mergedTree, rollupConfig(app));

  return new MergeTrees([bundle, app.toTree()]);
};
