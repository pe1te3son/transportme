import Ember from 'ember';

export function routeMode(params/*, hash*/) {
  let [mode, toReturn] = params;
  let routeData = {};

  switch (mode) {
    case 'foot':
      routeData.faIcon = 'male';
      routeData.tooltip = 'On foot';
      break;

    case 'tube':
      routeData.faIcon = 'subway';
      routeData.tooltip = 'Tube';
      break;

    case 'bus':
      routeData.faIcon = 'bus';
      routeData.tooltip = 'Bus';
      break;

    case 'train':
      routeData.faIcon = 'train';
      routeData.tooltip = 'Train';
      break;
  }

  if(toReturn === 'faIcon'){
    return routeData.faIcon;
  } else if(toReturn === 'tooltip'){
    return routeData.tooltip;
  }
}

export default Ember.Helper.helper(routeMode);