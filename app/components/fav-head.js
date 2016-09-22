import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: 'col l6 s12 m10 offset-m1',

  actions: {
    removeFavorite(){
      this.sendAction('removeFav', this.get('fav').favId);
    }
  }
});
