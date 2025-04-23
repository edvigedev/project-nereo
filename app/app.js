import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'project-nereo/config/environment';
// Add these imports
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// Initialize Font Awesome
library.add(faSearch, faMagnifyingGlass);

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;
}

loadInitializers(App, config.modulePrefix);
