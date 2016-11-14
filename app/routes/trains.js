import Ember from 'ember';

export default Ember.Route.extend({
  geolocateSrv: Ember.inject.service('geolocation-srv'),
  indexedDbPromised: Ember.inject.service('indexed-db'),

  model () {
    // Nearby in database fetch them
    return this.get('indexedDbPromised').getRoutes({
      $dbName: 'transportme-nearby',
      $dbStore: 'nearby'
    })
    .then(response => {
      if (response.length) {
        if (response[0].stations.length) {
          return response[0];
        }
      }

      return this.get('geolocateSrv').getCurrentCoordinates()
        .then(location => {
          return this.getNearbyStations(location)
          .then(response => {
            // If outside uk fetch default location - London Victoria station
            if (!response.stations.length) {
              console.log('Located outside UK. Loading default location...');
              return this.getNearbyStations({
                lat: 51.4947186,
                lng: -0.14361980000001
              });
            } else {
              return response;
            }
          });
        })
        .then(response => {
          this.saveNearbyStationsToDb(response);
          return response;
        });
    });
  },

  saveNearbyStationsToDb (stations) {
    this.get('indexedDbPromised').saveToDb({
      $dbName: 'transportme-nearby',
      $dbStore: 'nearby',
      $key: 'latest',
      $value: stations
    }).then(() => {
      console.log('Nearby stations added to db');
    });
  },

  getNearbyStations (location) {
    return fetch(`http://transportapi.com/v3/uk/train/stations/near.json?app_id=81d2c3ad&app_key=210cd3d0b88f32603edc631a13ce14f9&lat=${location.lat}&lon=${location.lng}`)
      .then(response => {
        return response.json();
      })
      .catch(res => {
        console.log('fetch failed');
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
