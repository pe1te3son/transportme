import Ember from 'ember';

export default Ember.Service.extend({
  requestDataFromTrasportApi(data){

    return fetch(this.buildRequestLink(data))
      .then((response)=>{
        return response.json()
          .then((jsonResponse)=>{
            return jsonResponse;
          });
      }).catch((err)=>{
        console.log('Failded to fetch data from trasportApi: ' + err);
        Materialize.toast('There has been error finding a route. Please try again later.', 6000);
      });
  },

  formatDate(date){
    if(date){
      let year = date.getFullYear();
      let day =  date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      let month = date.getMonth() + 1 < 10 ? `0${(date.getMonth() + 1)}` : date.getMonth() + 1;
      return `${year}-${month}-${day}`;
    } else {
      return null;
    }

  },

  formatTime(time){
    if(time){
      if(time % 60 === 0){
        return `${time / 60}:00`;
      } else {
        return `${(time - 30) / 60 }:30`;
      }
    } else {
      return null;
    }

  },

  buildRequestLink(data){
    console.log(data);

    const apiKey = '210cd3d0b88f32603edc631a13ce14f9';
    const apiId = '81d2c3ad';
    let fromLng = data.from.geometry.location.lng();
    let fromLat = data.from.geometry.location.lat();
    let toLng = data.to.geometry.location.lng();
    let toLat = data.to.geometry.location.lat();
    let date = this.formatDate(data.routeDate);
    let time = this.formatTime(data.routeTime);
    console.log(date, time);

    //&region=southeast

    if(date && time) {
      let link = `http://transportapi.com/v3/uk/public/journey/from/lonlat:${fromLng},${fromLat}/to/lonlat:${toLng},${toLat}/by/${date}/${time}.json?api_key=${apiKey}&app_id=${apiId}&modes=bus-train-tube`;
      console.log(link);
      return link;
    } else {
      let link = `http://transportapi.com/v3/uk/public/journey/from/lonlat:${fromLng},${fromLat}/to/lonlat:${toLng},${toLat}.json?api_key=${apiKey}&app_id=${apiId}&modes=bus-train-tube`;
      console.log(link);
      return link;
    }

  }

});
