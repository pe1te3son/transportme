import Ember from 'ember';

export default Ember.Controller.extend({
  autoComlete: Ember.inject.service('geolocation-srv'),
  actions: {
    fetchData(){
      console.log(this.get('autoComlete').fetchRouteData());
    },

    locationFrom(e){
      // The service require element id and string to name an object
      this.get('autoComlete').init(e.currentTarget.id, 'from');
    },

    locationTo(e){
      this.get('autoComlete').init(e.currentTarget.id, 'to');
    },
  }
});
