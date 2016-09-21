import Ember from 'ember';

/**
* @name Compare helper
* @desc compares 2 values
* @param { Array } params - 2 values
* @return boolean
*/
export function compare(params/*, hash*/) {
  return params[0] === params[1];
}

export default Ember.Helper.helper(compare);
