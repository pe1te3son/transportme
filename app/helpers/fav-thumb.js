import Ember from 'ember';

export function favThumb(params, options) {
  const [fromTo] = params;

  if(fromTo){
    return options.mode === 'destination' ? fromTo.split('->')[1].replace(/_/gi, " ") : fromTo.split('->')[0].replace(/_/gi, " ");
  }


}

export default Ember.Helper.helper(favThumb);
