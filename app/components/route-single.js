import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['col s12 route-single card'],

  click(e){
    console.log(e);
    $(e.currentTarget).find('.route-details').toggleClass('hide');
  }
});
