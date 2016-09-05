import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  didInsertElement(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
     $(".button-collapse").sideNav();
   });
 },
});
