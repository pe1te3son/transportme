import Ember from 'ember';

export function fromTo(params, options) {
  const [fromTo] = params;
  if(!fromTo){ return; }

  if(fromTo){
    return options.mode === 'to' ? fromTo.split('->')[1].replace(/_/gi, " ") : fromTo.split('->')[0].replace(/_/gi, " ");
  }


}

export default Ember.Helper.helper(fromTo);
