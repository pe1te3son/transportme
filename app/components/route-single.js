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

    addToFavorites(e){

      // TODO move prototype to global, refactor long string
      if (!Array.prototype.last){
          Array.prototype.last = function(){
              return this[this.length - 1];
          };
      }
      this.get('indexedDbPromised').saveToDb({
        $dbName: 'transportme-favorites',
        $dbStore: 'favorites',
        $key: `${JSON.parse(JSON.stringify(e.route_parts[0].from_point_name))}->${JSON.parse(JSON.stringify(e.route_parts.last().to_point_name))}`,
        $value: JSON.parse(JSON.stringify(e))
      }).then(()=>{
        console.log('added to favorites');
      });
    }
  }

});
