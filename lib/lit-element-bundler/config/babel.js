/* eslint-env node */
'use strict';

module.exports = function(targets) {
  return {
    legacy: {
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            targets: targets
          }
        ]
      ]
    }
  }
};
