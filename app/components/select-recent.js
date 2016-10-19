import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    itemselected (item) {
      // return selected value to initiator
      this.sendAction('optionSelected', item);
    }
  },

  didInsertElement: function () {
    this.$('select').material_select();
  },

  listChanged: function () {
    // Material desing doesnt change optsion automaticly
    // I have to rerender them manually if list changes
    return new Promise((resolve, reject) => {
      const el = this.$('select');
      if (!el) {
        reject();
      }
      resolve(el.material_select('destroy'));
    }).then(() => this.$('select').material_select())
      .catch(() => console.error('Element not found!'));
  }.observes('list')

});
