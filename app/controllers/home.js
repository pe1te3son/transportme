import Ember from 'ember';

export default Ember.Controller.extend({
  autoComlete: Ember.inject.service('geolocation-srv'),
  trasportapi: Ember.inject.service('trasport-api'),
  
  actions: {
    fetchData(){
      let routeData = this.get('autoComlete').fetchRouteData();
      this.get('trasportapi').requestDataFromTrasportApi(routeData)
      .then((response)=>{
        console.log(response);
        this.set('model', response);
      })
      .catch((err)=>{
        console.log('Failed to fetch route: ' + err);
      });

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
