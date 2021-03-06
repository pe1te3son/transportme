import Ember from 'ember';

/**
* @name Favorite Journeys page Controller
* @desc Controls favorites page
* @requires { indexed-db } services
*/
export default Ember.Controller.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  actions: {
    removeFromFavorites (id) {
      this.get('indexedDbPromised').removeById({
        $dbName: 'transportme-favorites',
        $dbStore: 'favorites',
        $id: id
      }).then(() => {
        /* global Materialize */
        Materialize.toast('Removed from favorites', 2000);
        // Refresh model
        return this.get('indexedDbPromised').getRoutes({
          $dbName: 'transportme-favorites',
          $dbStore: 'favorites'
        }).then((resp) => {
          this.set('model', resp);
        });
      });
    }
  }
});
