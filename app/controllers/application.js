import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  init () {
    window.addEventListener('offline', () => {
      /* global Materialize */
      Materialize.toast('Conection lost. Trying to reconect...');
    });
    window.addEventListener('online', () => {
      $('.toast').fadeOut('fast');
      Ember.run.later(() => {
        /* global location */
        location.reload();
      }, 500);
    });
    // Create or open Database before default route is loaded
    Ember.run.once(() => {
      this.get('indexedDbPromised').createIndexedDbStore({
        $dbName: 'transportme-favorites',
        $dbStore: 'favorites',
        $dbVersion: 1,
        $keyPath: 'favId'
      });

      this.get('indexedDbPromised').createIndexedDbStore({
        $dbName: 'transportme-recent',
        $dbStore: 'recent',
        $dbVersion: 1,
        $keyPath: 'fromTo',
        $index: ['by-date', 'request_time']
      });
    });
  }
});
