import Ember from 'ember';

export default Ember.Route.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  dbStore: 'journeys',
  model(){
    return this.get('indexedDbPromised').getRoutes({
      $dbName: 'transportme-recent',
      $dbStore: 'recent'
    }).then((resp)=>{
      return resp;
    });
  }
});
