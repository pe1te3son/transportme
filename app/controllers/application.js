import Ember from 'ember';

export default Ember.Controller.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  init(){
    // Create or open Database before default route is loaded
    Ember.run.once(()=>{
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

  },
});
