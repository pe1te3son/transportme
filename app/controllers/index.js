import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    initAutocomplete: function(e){
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      let autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById(e.currentTarget.id)),
          {types: ['geocode']});

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      autocomplete.addListener('place_changed', ()=>{
        let place = autocomplete.getPlace();
        console.log(place);
      });

      this.geolocate(autocomplete);
      this.set('autocomplete', autocomplete);



      // const apiKey = '210cd3d0b88f32603edc631a13ce14f9';
      // const apiId = '81d2c3ad';
      // let link = 'http://transportapi.com/v3/uk/public/journey/from/stop:London+bridge/to/stop:Canary+wharf/at/2016-10-18/15:29.json?not_modes=train&api_key='+ apiKey +'&app_id='+ apiId;
      // console.log(link);
      // fetch(link).then((response)=>{
      //   response.json().then((data)=>{
      //     console.log(data);
      //   });
      // });

    }
  },

  componentForm: {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  },

  geolocate: function(autocomplete) {
      // Bias the autocomplete object to the user's geographical location,
      // as supplied by the browser's 'navigator.geolocation' object.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    },//geolocate

    fillInAddress: function() {
      console.log('address entered');
    // // Get the place details from the autocomplete object.
    // var place = this.autocomplete.getPlace();
    // // Get each component of the address from the place details
    // // and fill the corresponding field on the form.
    // for (var i = 0; i < place.address_components.length; i++) {
    //   var addressType = place.address_components[i].types[0];
    //   if (this.componentForm[addressType]) {
    //     var val = place.address_components[i][this.componentForm[addressType]];
    //
    //     // Save each address type
    //     this.event.eventLocation[addressType] = val;
    //   }
    // }
  }//fillInAddress

});
