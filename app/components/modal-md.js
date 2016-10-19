import Ember from 'ember';

/**
* @name Materialize desing Modal Component
* @desc Materialize desing Modal
* @param { Object } model - data to display
*/
export default Ember.Component.extend({
  didRender () {
    this._super();
    const vm = this;
    Ember.$('#modal1').openModal({
      complete: () => {
        vm.get('router').transitionTo('favorites');
      }
    });
  }
});
