'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    // ...existing options...
    fingerprint: {
      exclude: [
        'leaflet.css',
        'images/marker-icon.png',
        'images/marker-icon-2x.png',
        'images/marker-shadow.png',
      ],
    },
  });
  return app.toTree();
};
