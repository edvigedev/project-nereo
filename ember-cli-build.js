'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {});

  app.import('app/styles/homepage.css');
  app.import('app/styles/nasa-missions.css');

  return app.toTree();
};
