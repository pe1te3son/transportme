import Ember from 'ember';

export default Ember.Route.extend({
  geolocateSrv: Ember.inject.service('geolocation-srv'),

  model () {
    return this.get('geolocateSrv').getCurrentCoordinates()
      .then(location => {
        return this.getNearbyStations(location);
      })
      .then(response => {
        return response;
      });
  },

  getNearbyStations (location) {
    return fetch(`http://transportapi.com/v3/uk/train/stations/near.json?app_id=81d2c3ad&app_key=210cd3d0b88f32603edc631a13ce14f9&lat=${location.lat}&lon=${location.lng}`)
      .then(response => {
        return response.json();
      });
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    this.controllerFor('trains').set('timetable', null);
    Ember.run.schedule('afterRender', () => {
      this.controllerFor('trains').setInitialState();
    });
  }
});
