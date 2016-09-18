import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  toLocation: null,
  fromLocation: null,
  toLocationList: null,
  fromLocationList: null,
  toDisplay: null,

  actions: {
    toLocSelected(itemSelected){
      this.set('toLocation', itemSelected);
    },

    fromLocSelected(itemSelected){
      this.set('fromLocation', itemSelected);
    }
  },

  // Watch for changes on input
  fromLocationObserver: function(){
    this.toggleAnimation('.select-result-cont', 'cont-back', 'remove')
    .then(()=>{

      //Search based on "from location" input if found update "to location"
      let routeFound = this.get('model').filterBy('from', this.get('fromLocation'));
      if(!routeFound.length){
        this.set('toLocation', null);
        // Resets selection list if default selected
        this.set('toLocationList', null);
        return;
      }
      this.set('toLocationList', routeFound);
      this.displayRecent();

    });
  }.observes('fromLocation'),

  toLocationObserver: function(){
    // wait for animation
    this.toggleAnimation('.select-result-cont', 'cont-back', 'remove')
    .then(()=>{

      //Filter based on "from location" input if found update "to location"
      let routeFound = this.get('model').filterBy('to', this.get('toLocation'));

      if(!routeFound.length){
        this.set('fromLocation', null);
        this.set('fromLocationList', null);
        return;
      }
      this.set('fromLocationList', routeFound);
      this.displayRecent();

    });
  }.observes('toLocation'),

  displayRecent(){
    if(this.get('fromLocation') && this.get('toLocation')){
      return this.get('indexedDbPromised').getById({
        $dbName: 'transportme-recent',
        $dbStore: 'recent',
        $id: `${this.get('fromLocation')}->${this.get('toLocation')}`.replace(/ /gi, "_")
      }).then((route)=>{
        this.set('toDisplay', route);
      }).then( ()=> this.toggleAnimation('.select-result-cont', 'cont-back', 'add') );
    }
  },//displayRecent

  toggleAnimation($el, $animation, $option){
    return new Promise((resolve, reject)=>{

      if($option === 'add'){
        resolve($($el).addClass($animation));
      } else if( $option === 'remove' ){
        resolve($($el).removeClass($animation));
      }

      reject('No option provided!');
    }).catch((err)=>{
      console.error(`function toggleAnimation(): ${err}`);
    });
  },
});
