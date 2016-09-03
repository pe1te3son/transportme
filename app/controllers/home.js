import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  autoComlete: Ember.inject.service('geolocation-srv'),
  trasportapi: Ember.inject.service('trasport-api'),
  routeDateUnformated: null,
  routeTimeUnformated: null,
  isLoading: false,

  actions: {
    fetchData(){
      // Initialize loader
      this.set('isLoading', true);

      let routeData = this.get('autoComlete').fetchRouteData();

      if(!routeData.from || !routeData.to){
        this.set('isLoading', false);
        return;
      }

      if(this.get('routeDateUnformated')){
        routeData.routeDate = this.get('routeDateUnformated');
      }
      if(this.get('routeTimeUnformated')){
        routeData.routeTime = this.get('routeTimeUnformated');
      }

      this.get('trasportapi').requestDataFromTrasportApi(routeData)
      .then((response)=>{
        this.set('isLoading', false);
        this.set('model', response);
      })
      .catch((err)=>{
        console.log('Failed to fetch route: ' + err);
        this.set('isLoading', false);
      });
    },

    locationFrom(e){
      // The service require element id and string to name an object
      this.get('autoComlete').initAutocomplete(e.id, 'from');
    },

    locationTo(e){
      this.get('autoComlete').initAutocomplete(e.id, 'to');
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
