import Ember from 'ember';

export default Ember.Controller.extend({

  departureStation: function () {
    return this.get('model').station_name;
  }.property('model')
});
