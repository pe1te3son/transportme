import Ember from 'ember';

export default Ember.Route.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  model(){
    return this.get('indexedDbPromised').getRoutes({
      $dbName: 'transportme-favorites',
      $dbStore: 'favorites'
    }).then((resp)=>{
      return resp;
    });
  },
});
