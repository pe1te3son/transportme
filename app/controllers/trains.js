import Ember from 'ember';
import $ from 'jquery';
import moment from 'npm:moment';

export default Ember.Controller.extend({
  transportApiSrv: Ember.inject.service('trasport-api'),
  geolocateSrv: Ember.inject.service('geolocation-srv'),
  indexedDbPromised: Ember.inject.service('indexed-db'),
  searchLocation: null,
  destinations: null,
  selectedDestination: null,
  timetable: null,

  setInitialState () {
    const initialStation = this.get('model').stations[0];
    if (this.get('searchLocation') === null) {
      this.set('searchLocation', initialStation.name);
    }
    this.setDestinationSelectList(initialStation.station_code);
  },

  beatifyDatepickerValue: function () {
    if (this.get('datepickerValue')) {
      return moment(this.get('datepickerValue')).format('DD MMM YYYY');
    }
  }.property('datepickerValue'),

  beatifyTimepickerValue: function () {
    let time = this.get('trainsTimeValue');
    if (time) {
      return this.convertTime(time);
    }
  }.property('trainsTimeValue'),

  actions: {
    destinationSelected (destination) {
      let selectedService = this.get('destinations').filterBy('destination_name', destination);
      this.set('timetable', selectedService);
    },
    departureSelected (departureStation) {
      const $selectEl = $('.station-select');

      $selectEl.attr('disabled', 'disabled');
      $('select').material_select();
      this.set('timetable', null);
      this.setDestinationSelectList(departureStation).then(() => {
        $selectEl.removeAttr('disabled');
      });
    },

    trainsDatepicker (e) {
      const _this = this;
      $('#trains-date-picker').pickadate({
        min: () => {
          return new Date();
        },
        onSet: function (date) {
          console.log(date.select);
          _this.set('datepickerValue', date.select);
        }
      });
    },

    trainsTimePicker () {
      const _this = this;
      $('#trains-time-picker').pickatime({
        onSet: function (time) {
          _this.set('trainsTimeValue', time.select);
          this.close();
        }
      });
    },

    autoComleteInit () {
      this.get('geolocateSrv').initAutocomplete('autocomplete-input', 'autocompletePayload');
    },

    getTrains () {
      let data = this.get('geolocateSrv').fetchRouteData();
      this.getNearbyStations({
        lat: data.autocompletePayload.geometry.location.lat(),
        lng: data.autocompletePayload.geometry.location.lng()
      })
        .then(response => {
          this.set('model', response);
          this.setInitialState();
        })
        .then(() => {

        });
    }
  }, // Actions

  getNearbyStations (location) {
    return fetch(`http://transportapi.com/v3/uk/train/stations/near.json?app_id=81d2c3ad&app_key=210cd3d0b88f32603edc631a13ce14f9&lat=${location.lat}&lon=${location.lng}`)
      .then(response => {
        return response.json();
      });
  },

  setDestinationSelectList (stationCode) {
    return this.get('transportApiSrv').getTrainSchedule({stationCode})
      .then(response => {
        this.set('destinations', response.departures.all);
        Ember.run.later(() => {
          $('select.departures-select').children().eq(1).attr('selected', 'selected');
          $('select').material_select();
        }, 500);
        return response;
      })
      .then(res => {
        this.get('indexedDbPromised').saveToDb({
          $dbName: 'transportme-trains',
          $dbStore: 'trains',
          $value: res
        }).then(() => {
          console.log('added to db');
        });
      });
  convertTime (time) {
    if (time) {
      if (time % 60 === 0) {
        return `${time / 60}:00`;
      } else {
        return `${(time - 30) / 60}:30`;
      }
    }
  }
});
