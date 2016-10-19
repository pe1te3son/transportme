import Ember from 'ember';

/**
* @name Geolocation service
* @desc Goole`s Autocomplete Api
* @param { String } $objectName - name of the object to save return under
* @param { string } $elemenId - id of input element
*/
export default Ember.Service.extend({
  routeData: {},

  initAutocomplete: function ($elemenId, $objectName) {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    if ($elemenId) {
      let autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById($elemenId)),
          {types: ['geocode']});

      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace();
        this.set('routeData.' + $objectName, place);
      });

      this.geolocate(autocomplete);
      this.set('autocomplete', autocomplete);
    }
  },

  fetchRouteData: function () {
    return this.get('routeData');
  },

  geolocate: function (autocomplete) {
     // Bias the autocomplete object to the user's geographical location,
     // as supplied by the browser's 'navigator.geolocation' object.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        /* global google */
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  } // geolocate

});
