import Ember from 'ember';
import $ from 'jquery';

/**
* @name Main Navigation Bar Component
* @desc Main Navigation
* @param none
*/
export default Ember.Component.extend({
  didInsertElement(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
     $(".button-collapse").sideNav();
   });
 },
});
