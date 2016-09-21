import Ember from 'ember';
import $ from 'jquery';

/**
* @name Home page Controller
* @desc Controls home page
* @requires { 'geolocation-srv, trasport-api, indexed-db } services
*/
export default Ember.Controller.extend({
  autoComlete: Ember.inject.service('geolocation-srv'),
  trasportapi: Ember.inject.service('trasport-api'),
  indexedDbPromised: Ember.inject.service('indexed-db'),
  routeDateUnformated: null,
  routeTimeUnformated: null,
  loaderOn: false,
  formUp: false,

  actions: {
    fetchData(){
      let routeData = this.get('autoComlete').fetchRouteData();
      if(!routeData.from || !routeData.to){
        return;
      }

      // If time and date selected add them to the search query object
      if(this.get('routeDateUnformated')){
        routeData.routeDate = this.get('routeDateUnformated');
      }
      if(this.get('routeTimeUnformated')){
        routeData.routeTime = this.get('routeTimeUnformated');
      }

      // Clear search results
      this.set('model', null);

      // Slide form up
      this.set('formUp', true);

      // Delay loader while form is being animated
      Ember.run.later(()=>{
        // Initialize loader
        this.set('loaderOn', true);
        this.trasportapiInit(routeData)
        // keeps scrollbar on while fetching data
        .then(()=> $('body').css('min-height', '100vh') );

      }, 350);

    },

    locationFrom(e){
      // The service require element id and string to name an object
      this.get('autoComlete').initAutocomplete(e.id, 'from');
    },

    locationTo(e){
      this.get('autoComlete').initAutocomplete(e.id, 'to');
    },

    dateSelected(element){
      let vm = this;// requires for ember to work inside pikadate object
      $(element).pickadate({
        min: ()=>{
          return new Date();
        },
        onSet: function(date){
          vm.set('routeDateUnformated', new Date(date.select));
        }
      });
    },

    timeSelected(element){
      let vm = this;
      $(element).pickatime({
        min: ()=>{
          return new Date();
        },
        onSet: function(time){
          vm.set('routeTimeUnformated', time.select);
          this.close();
        }
      });
    },
  },//actions

  // Fetches journeys
  trasportapiInit(data){

  return  this.get('trasportapi').requestDataFromTrasportApi(data)
    .then((response)=>{

      if(response.identification) {
        Materialize.toast('Journey not Found!', 3000);
        return;
      }
      response.from = data.from.name;
      response.to = data.to.name;
      response.fromTo =`${data.from.name}->${data.to.name}`.replace(/ /gi, "_");
      this.get('indexedDbPromised').saveToDb({
        $dbName: 'transportme-recent',
        $dbStore: 'recent',
        $value: response
      }).then(()=>{
        console.log('added to db');
      });
      return response;
    })
    .then((resp)=>{
      this.set('loaderOn', false);
      this.set('model', resp);
    })
    .catch((err)=>{
      console.log('Trasportapi request failed: ' + err);
      this.set('loaderOn', false);
    });
  },


});
