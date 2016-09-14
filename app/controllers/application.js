import Ember from 'ember';

export default Ember.Controller.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  init(){
    this.get('indexedDbPromised').createIndexedDbStore({
      $dbName: 'transportme-recent',
      $dbStore: 'recent',
      $dbVersion: 1
    });

    this.get('indexedDbPromised').createIndexedDbStore({
      $dbName: 'transportme-favorites',
      $dbStore: 'favorites',
      $dbVersion: 2
    });
  },
});
