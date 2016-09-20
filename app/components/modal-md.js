import Ember from 'ember';

export default Ember.Component.extend({
  didRender(){
    this._super();
    const vm =  this;
    Ember.$('#modal1').openModal({
      complete: ()=>{
         vm.get('router').transitionTo('favorites');
      }
    });
  }
});
