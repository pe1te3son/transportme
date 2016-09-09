import Ember from 'ember';

export default Ember.Route.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  recentSearchDb: {
    dbName: 'transportme-v1',
    store: 'recent'
  },
  model(){
    return this.get('indexedDbPromised').getRoutes(this.get('recentSearchDb')).then((resp)=>{
      return resp;
    });
  }
});
