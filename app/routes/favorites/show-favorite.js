import Ember from 'ember';

export default Ember.Route.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  model(params){

    return this.get('indexedDbPromised').getById({
      $dbName: 'transportme-favorites',
      $dbStore: 'favorites',
      $id: params.fromTo
    });
    
  }
});
