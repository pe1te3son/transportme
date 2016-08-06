import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  autoComlete: Ember.inject.service('geolocation-srv'),
  trasportapi: Ember.inject.service('trasport-api'),
  routeDateUnformated: null,
  routeTimeUnformated: null,

  actions: {
    test(){
      console.log(this.routeDateUnformated, this.routeTimeUnformated );
    },

    fetchData(){
      let routeData = this.get('autoComlete').fetchRouteData();
      if(this.get('routeDateUnformated')){
        routeData.routeDate = this.get('routeDateUnformated');
      }
      if(this.get('routeTimeUnformated')){
        routeData.routeTime = this.get('routeTimeUnformated');
      }

      this.get('trasportapi').requestDataFromTrasportApi(routeData)
      .then((response)=>{
        this.set('model', response);
      })
      .catch((err)=>{
        console.log('Failed to fetch route: ' + err);
      });

    },

    locationFrom(e){
      // The service require element id and string to name an object
      this.get('autoComlete').initAutocomplete(e.currentTarget.id, 'from');
    },

    locationTo(e){
      this.get('autoComlete').initAutocomplete(e.currentTarget.id, 'to');
    },

    dateSelected(element){
      // requires for ember to work inside pikadate object
      let vm = this;
      $(element).pickadate({
        onSet: function(date){
          vm.set('routeDateUnformated', new Date(date.select));
        }
      });
    },

    timeSelected(element){
      let vm = this;
      $(element).pickatime({
        onSet: function(time){
          vm.set('routeTimeUnformated', time.select);
        }
      });
    },
  },//actions


});
