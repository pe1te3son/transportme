import Ember from 'ember';
import $ from 'jquery';
import moment from 'npm:moment';

/**
* @name Trains page Controller
* @desc Controls trains page
* @requires { indexed-db, geolocation-srv, transportapi } services
*/
export default Ember.Controller.extend({
  transportApiSrv: Ember.inject.service('trasport-api'),
  geolocateSrv: Ember.inject.service('geolocation-srv'),
  indexedDbPromised: Ember.inject.service('indexed-db'),
  searchLocation: null,
  destinations: null,
  selectedDestination: null,
  timetable: null,

  // Fetch station automaticly selected by application
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
      if (departureStation === '0') { return; }
      const $selectEl = $('.station-select');

      $selectEl.attr('disabled', 'disabled');
      $('select').material_select();
      this.set('timetable', null);
      this.setDestinationSelectList(departureStation).then(() => {
        $selectEl.removeAttr('disabled');
      });
    },

    trainsDatepicker () {
      const _this = this;
      $('#trains-date-picker').pickadate({
        min: () => {
          return new Date();
        },
        onSet: function (date) {
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

    // Fetch and save nearby station
    getTrains () {
      let data = this.get('geolocateSrv').fetchRouteData();
      return this.getNearbyStations({
        lat: data.autocompletePayload.geometry.location.lat(),
        lng: data.autocompletePayload.geometry.location.lng()
      })
        .then(response => {
          this.set('model', response);
          this.setInitialState();
          return response;
        })
        .then((resp) => {
          this.get('indexedDbPromised').saveToDb({
            $dbName: 'transportme-nearby',
            $dbStore: 'nearby',
            $key: 'latest',
            $value: resp
          }).then(() => {
            console.log('Nearby stations added to db');
          });
        });
    }
  }, // Actions

  getNearbyStations (location) {
    return fetch(`http://transportapi.com/v3/uk/train/stations/near.json?app_id=81d2c3ad&app_key=210cd3d0b88f32603edc631a13ce14f9&lat=${location.lat}&lon=${location.lng}`)
      .then(response => {
        return response.json();
      });
  },

  // Fetches destination stations and timetables when user selects departure station
  setDestinationSelectList (stationCode) {
    return this.findStationInDb(stationCode)
      .then(response => {
        if (response) {
          const time = this.get('trainsTimeValue');
          const timeFormated = this.convertTime(time);
          // If departure station timetable matches database record, get it
          if (time && response.time_of_day === moment(timeFormated, 'H:mm').format('HH:mm')) {
            return response;
          } else if (typeof time === 'undefined') {
            // If matches record but departure time not selected, get the station
            return response;
          }
        }

        // Fetch timetible if record not in database
        let queryData = {
          stationCode,
          date: moment().format('YYYY-MM-DD')
        };

        if (this.get('trainsTimeValue') && this.get('datepickerValue')) {
          const time = this.convertTime(this.get('trainsTimeValue'));
          queryData.time = moment(time, 'H:mm').format('HH:mm');
          queryData.date = moment(this.get('datepickerValue')).format('YYYY-MM-DD');
        }

        return this.get('transportApiSrv').getTrainSchedule(queryData)
          .then(response => {
            this.saveStationToDb(response);
            return response;
          });
      })
      .then(resp => {
        this.set('destinations', resp.departures.all);
        Ember.run.later(() => {
          $('select.departures-select').children().eq(1).attr('selected', 'selected');
          $('select').material_select();
        }, 200);
      });
  },

  findStationInDb (stationCode) {
    return this.get('indexedDbPromised').getById({
      $dbName: 'transportme-trains',
      $dbStore: 'trains',
      $id: stationCode
    });
  },

  saveStationToDb (station) {
    return this.get('indexedDbPromised').saveToDb({
      $dbName: 'transportme-trains',
      $dbStore: 'trains',
      $value: station
    }).then(() => {
      console.log('Station added to db');
    });
  },

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
