import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    const url = 'http://transportapi.com/v3/uk/train/station/VIC/2016-11-22/10:00/timetable.json?app_id=81d2c3ad&app_key=210cd3d0b88f32603edc631a13ce14f9&train_status=passenger';
    return fetch(url)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(jsonResponse);
        return jsonResponse;
      });
  }
});
