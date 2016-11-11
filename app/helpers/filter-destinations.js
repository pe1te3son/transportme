import Ember from 'ember';

export function filterDestinations (params) {
  if (params[0]) {
    return params[0].uniqBy(params[1]);
  }
}

export default Ember.Helper.helper(filterDestinations);
