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

  setDestinationSelectList (stationCode) {
    return this.get('transportApiSrv').getTrainSchedule({stationCode})
      .then(response => {
        this.set('destinations', response.departures.all);
        Ember.run.later(() => {
          $('select').material_select();
        }, 500);
      });
  }
});
