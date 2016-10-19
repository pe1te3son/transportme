import Ember from 'ember';
import $ from 'jquery';

/**
* @name Recent Journeys page Controller
* @desc Controls recent page
* @requires { indexed-db } services
*/
export default Ember.Controller.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  toLocation: null,
  fromLocation: null,
  toLocationList: null,
  fromLocationList: null,
  toDisplay: null,
  loadingRecent: false,
  recentVisible: false,

  actions: {
    toLocSelected (itemSelected) {
      this.set('toLocation', itemSelected);
    },

    fromLocSelected (itemSelected) {
      this.set('fromLocation', itemSelected);
    }
  },

  // Watch for changes on input
  fromLocationObserver: function () {
    // Search based on "from location" input if found update "to location"
    let routeFound = this.get('model').filterBy('from', this.get('fromLocation'));
    if (!routeFound.length) {
      this.set('recentVisible', false);
      // Resets selection list if default selected
      this.set('toLocationList', null);
      return;
    }
    this.set('toLocationList', routeFound);
    this.displayRecent();
  }.observes('fromLocation'),

  toLocationObserver: function () {
    // Filter based on "from location" input if found update "to location"
    let routeFound = this.get('model').filterBy('to', this.get('toLocation'));

    if (!routeFound.length) {
      this.set('recentVisible', false);
      this.set('fromLocationList', null);
      return;
    }
    this.set('fromLocationList', routeFound);
    this.displayRecent();
  }.observes('toLocation'),

  displayRecent () {
    this.set('recentVisible', false);
    if (this.get('fromLocation') && this.get('toLocation')) {
      this.set('loadingRecent', true);
      return this.get('indexedDbPromised').getById({
        $dbName: 'transportme-recent',
        $dbStore: 'recent',
        $id: `${this.get('fromLocation')}->${this.get('toLocation')}`.replace(/ /gi, '_')
      }).then((route) => {
        Ember.run.later(() => {
          this.set('loadingRecent', false);
          this.set('recentVisible', true);
          this.set('toDisplay', route);
        }, 500);
      }).then(() => this.toggleAnimation('.select-result-cont', 'cont-back', 'add'));
    }
  }, // displayRecent

  // Slides up or down
  toggleAnimation ($el, $animation, $option) {
    return new Promise((resolve, reject) => {
      if ($option === 'add') {
        resolve($($el).addClass($animation));
      } else if ($option === 'remove') {
        resolve($($el).removeClass($animation));
      }

      reject('No option provided!');
    }).catch((err) => {
      console.error(`function toggleAnimation(): ${err}`);
    });
  }
});
