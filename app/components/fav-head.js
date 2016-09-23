import Ember from 'ember';

/**
* @name Favorite Journey head Component
* @desc Displays Favorite Journey thumb
* @param { Object } fav - jorney data
* @param { Action } removeFav - action in parent to remove favorite from DB
* @return { string } favId - id of journey as saved in favorites DB store
*/
export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'col l6 s12 m10 offset-m1',

  actions: {
    removeFavorite(){
      this.sendAction('removeFav', this.get('fav').favId);
    }
  }
});
