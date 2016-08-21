import Ember from 'ember';

export function routeMode(params/*, hash*/) {
  let [mode] = params;
  let routeIcon = '';

  switch (mode) {
    case 'foot':
      routeIcon = 'male';
      break;

    case 'tube':
      routeIcon = 'subway';
      break;

    case 'bus':
      routeIcon = 'bus';
      break;

    case 'train':
      routeIcon = 'train';
      break;
  }
  return routeIcon;
}

export default Ember.Helper.helper(routeMode);
