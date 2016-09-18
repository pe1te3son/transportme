import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  route: function(path) {
      this._super(path);
      var actualPath = this.get("currentState").absoluteRoute(this);
      if (path !== actualPath) {
        this.transitionTo("not-found");
      }
    }
});

Router.map(function() {
  this.route('home', { path: '/'});
  this.route('recent');
  this.route('404', {path: '/*path'});
  this.route('favorites', function() {
    this.route('show-favorite', {path: '/:fromTo'});
  });
});

export default Router;
