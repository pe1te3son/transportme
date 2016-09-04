import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', { path: '/'}, function() {
    this.route('route-details', {path: '/:departure_time'});
  });
});

export default Router;
