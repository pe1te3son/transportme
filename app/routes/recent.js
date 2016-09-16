import Ember from 'ember';

export default Ember.Route.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  model(){
    return this.get('indexedDbPromised').getRoutes({
      $dbName: 'transportme-recent',
      $dbStore: 'recent'
    }).then((resp)=>{
      return resp;
    });
  },

  actions: {
    toLocSelected(e){
      console.log(e);
    },

    fromLocSelected(e){
      console.log(e);
    }
  },
});
