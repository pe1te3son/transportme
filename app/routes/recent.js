import Ember from 'ember';

export default Ember.Route.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  dbStore: 'journeys',
  model(){
    return this.get('indexedDbPromised').getRoutes(this.get('dbStore')).then((resp)=>{
      return resp;
    });
  }
});
