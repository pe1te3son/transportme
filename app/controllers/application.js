import Ember from 'ember';
import $ from 'jquery';

export default Ember.Controller.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  init () {
    window.addEventListener('offline', () => {
      /* global Materialize */
      Materialize.toast('Conection lost. Trying to reconect...');
    });
    window.addEventListener('online', () => {
      $('.toast').fadeOut('fast');
      Ember.run.later(() => {
        /* global location */
        location.reload();
      }, 500);
    });
  },

  currentPathDidChange: function () {
    Ember.run.schedule('afterRender', () => {
      if (this.get('currentPath') === 'trains') {
        Materialize.updateTextFields();
      }
    });
  }.observes('currentPath')
});
