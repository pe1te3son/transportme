import Ember from 'ember';

export default Ember.Service.extend({
  init(){
    console.log('im trasport service');
  },

  requestDataFromTrasportApi(data){
    const apiKey = '210cd3d0b88f32603edc631a13ce14f9';
    const apiId = '81d2c3ad';
    let fromLng = data.from.geometry.location.lng();
    let fromLat = data.from.geometry.location.lat();
    let toLng = data.to.geometry.location.lng();
    let toLat = data.to.geometry.location.lat();

    //let link = 'http://transportapi.com/v3/uk/public/journey/from/stop:London+bridge/to/stop:Canary+wharf/at/2016-10-18/15:29.json?api_key='+ apiKey +'&app_id='+ apiId + '&modes=bus-train-tube';
    let link = 'http://transportapi.com/v3/uk/public/journey/from/lonlat:'+ fromLng +','+ fromLat +'/to/lonlat:'+ toLng +','+ toLat +'.json?api_key='+ apiKey +'&app_id='+ apiId + '&modes=bus-train-tube';
    console.log(link);

    return fetch(link)
      .then((response)=>{
        return response.json()
          .then((jsonResponse)=>{
            return jsonResponse;
          });
      }).catch((err)=>{
        console.log('Failded to fetch data from trasportApi: ' + err);
      });
  },

});
