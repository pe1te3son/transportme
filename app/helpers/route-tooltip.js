import Ember from 'ember';

export function routeTooltip(params/*, hash*/) {
  let [mode] = params;
  let tooltip = '';

  switch (mode) {
    case 'foot':
      tooltip = 'On Foot';
      break;

    case 'tube':
      tooltip = 'Tube';
      break;

    case 'bus':
      tooltip = 'Bus';
      break;

    case 'train':
      tooltip = 'Train';
      break;
  }

  return tooltip;
}

export default Ember.Helper.helper(routeTooltip);
