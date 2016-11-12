import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  transportApiSrv: Ember.inject.service('trasport-api'),
  searchLocation: null,
  destinations: null,
  selectedDestination: null,
  timetable: null,

  setInitialState () {
    const initialStation = this.get('model').stations[0];
    this.set('searchLocation', initialStation.name);
    $('.departures-select').children().eq(1).attr('selected', 'selected');

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
      if (time % 60 === 0) {
        return `${time / 60}:00`;
      } else {
        return `${(time - 30) / 60}:30`;
      }
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
    }
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
  }
});
