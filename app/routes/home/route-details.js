import Ember from 'ember';

export default Ember.Route.extend({
  model(params){
    console.log(params);
    //console.log(this.get('store').findRecord('routes', params.departure_time));
  }
});
