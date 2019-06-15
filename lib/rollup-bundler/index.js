/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  included(appOrAddon) {
    this._super.included.apply(this, arguments);
    this._app = appOrAddon.app || appOrAddon;

    this._app.import('node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js', {
      options: 'prepend'
    });
  },

  contentFor(type) {
    if (type === 'body-footer') {
      return '<!-- Hola mundo -->';
    }
  }
};
