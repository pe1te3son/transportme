import Ember from 'ember';

export function routeDuration(params/*, hash*/) {
  let timeSplit = params[0].split(':');
  console.log(timeSplit);

  let timeFormated = '';
  if(timeSplit[0] !== '00'){
    timeFormated += `${timeSplit[0]} hrs `;
  }

  if(timeSplit[1] !== '00'){
    timeFormated += `${timeSplit[0]} min`;
  }

  return timeFormated;
}

export default Ember.Helper.helper(routeDuration);
