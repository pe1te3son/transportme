import Ember from 'ember';

export default Ember.Route.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  model(){
    return this.get('indexedDbPromised').getRoutes({dbName: 'transportme-v1', store: 'recent'}).then((resp)=>{
      return resp;
    });
  }
});
