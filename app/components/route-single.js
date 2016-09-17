import Ember from 'ember';
import $ from 'jquery';

export default Ember.Component.extend({
  indexedDbPromised: Ember.inject.service('indexed-db'),
  tagName: 'li',
  classNames: ['col s12 route-single card'],

  actions: {
    showDetails(e){
      $(e.element).find('.route-details').toggleClass('show-details');
      $('.tooltipped').tooltip({
        delay: 20
      });
    },

    addToFavorites(event){
      return new Promise((resolve, reject)=>{
        if(!event) { reject(); }

        const el = $(this.get('element')).find('.set-favorite');

        // Set jorney hook
        event.fromTo = this.get('fromTo');
        el.toggleClass('favorite-added');
        resolve(el.hasClass('favorite-added'));

      }).then((isInDB)=>{

        const jorneyId = `${JSON.parse(JSON.stringify(event.route_parts[0].departure_time))}->${this.get('fromTo')}`;

        if(!isInDB){
          return this.get('indexedDbPromised').removeById({
                    $dbName: 'transportme-favorites',
                    $dbStore: 'favorites',
                    $id: jorneyId
                  }).then(()=>{
                    console.log(`${jorneyId} removed from favorites`);
                  });
        }

        return this.get('indexedDbPromised').saveToDb({
                  $dbName: 'transportme-favorites',
                  $dbStore: 'favorites',
                  $key: jorneyId,
                  $value: JSON.parse(JSON.stringify(event))
                }).then(()=>{
                  console.log(`${jorneyId} added to favorites`);
                  Materialize.toast('Journey added to favorites', 1000);
                });
      });
    }// add to favorites

  },//Actions


});
