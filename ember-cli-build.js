'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // ...existing options...
    fingerprint: {
      exclude: ['leaflet.css'],
    },
  });
  return app.toTree();
};
