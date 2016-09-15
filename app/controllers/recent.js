import Ember from 'ember';

export default Ember.Controller.extend({
  toLocation: null,
  fromLocation: null,
  // Watch for changes on input
  fromLocationObserver: function(){

    //Search based on "from location" input if found update "to location"
    let routeFound = this.get('model').findBy('from', this.get('fromLocation'));
    if(!routeFound){
      return this.set('toLocation', null);
    }
    this.set('toLocation', routeFound.to);
  }.observes('fromLocation'),

  // toLocationObserver: function(){
  //
  //   //Search based on "from location" input if found update "to location"
  //   let routeFound = this.get('model').findBy('to', this.get('toLocation'));
  //   if(!routeFound){
  //     return this.set('fromLocation', null);
  //   }
  //   this.set('fromLocation', routeFound.from);
  // }.observes('toLocation'),

  actions: {
    test(e){
      console.log(this.buildList('to'));
    }
  },

});
