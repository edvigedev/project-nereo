import EmberRouter from '@ember/routing/router';
import config from 'project-nereo/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('homepage');
  this.route('nasa-missions');
  this.route('gallery');
  this.route('iss-tracker');
  this.route('your-favorites');
});
