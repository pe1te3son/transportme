import Ember from 'ember';

export function routeDuration(params/*, hash*/) {
  let timeSplit = params[0].split(':');
  let timeFormated = '';
  console.log(timeSplit);
  if(timeSplit[0] !== '00'){
    timeFormated += `${timeSplit[0].replace(/^0+/, '')} hrs `;
  }

  if(timeSplit[1] !== '00'){
    timeFormated += `${timeSplit[1].replace(/^0+/, '')} min`;
  }

  return timeFormated;
}

export default Ember.Helper.helper(routeDuration);
