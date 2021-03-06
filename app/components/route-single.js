import Ember from 'ember';
import $ from 'jquery';

/**
* @name Single jorney Component
* @desc Displays and controls single journey
* @requires { indexed-db, route, fromTo, acknowledgements } services
* @param { Object } route - single route data
* @param { String } fromTo - jorney id hook
* @param { String } acknowledgements
*/
export default Ember.Component.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  tagName: 'li',
  classNames: ['col s12 route-single card hoverable'],

  actions: {
    showDetails (e) {
      $(e.element).find('.route-details').toggleClass('show-details');
      $('.tooltipped').tooltip({
        delay: 20
      });
    },

    addToFavorites (event) {
      // Set all data in promise when resolved save or remove
      return new Promise((resolve, reject) => {
        if (!event) { reject(); }

        const el = $(this.get('element')).find('.set-favorite');

        // Set jorney hook
        event.acknowledgements = this.get('acknowledgements');
        event.fromTo = this.get('fromTo');
        event.favId = `${JSON.parse(JSON.stringify(event.route_parts[0].departure_time)).replace(/:/gi, '_')}->${this.get('fromTo')}`;

        // Visual feedback
        el.toggleClass('favorite-added');
        resolve(el.hasClass('favorite-added'));
      }).then((isInDB) => {
        if (!isInDB) {
          return this.get('indexedDbPromised').removeById({
            $dbName: 'transportme-favorites',
            $dbStore: 'favorites',
            $id: event.favId
          }).then(() => {
            console.log(`${event.favId} removed from favorites`);
          });
        }

        return this.get('indexedDbPromised').saveToDb({
          $dbName: 'transportme-favorites',
          $dbStore: 'favorites',
          $value: JSON.parse(JSON.stringify(event))
        }).then(() => {
          console.log(`${event.favId} added to favorites`);
          /* global Materialize */
          Materialize.toast('Journey added to favorites', 1000);
        });
      });
    } // add to favorites

  } // Actions

});
