import Ember from 'ember';

/**
* @name From To helper
* @desc Splits string with '->'. If no options it automaticly returns
*  from location. Which is first part of the string.
* @param { String } params - fromTo value
* @param { Object } options - select which part of the string to return
* @return string
*/

export function fromTo(params, options) {
  const [fromTo] = params;
  if(!fromTo){ return; }

  if(fromTo){
    return options.mode === 'to' ? fromTo.split('->')[1].replace(/_/gi, " ") : fromTo.split('->')[0].replace(/_/gi, " ");
  }


}

export default Ember.Helper.helper(fromTo);
