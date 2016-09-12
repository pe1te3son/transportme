import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['col s12 route-single card'],

  actions: {
    showDetails(e){
      $(e.element).find('.route-details').toggleClass('show-details');
      $('.tooltipped').tooltip({
        delay: 20
      });
    }
  }

});
