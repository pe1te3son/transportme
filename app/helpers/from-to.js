import Ember from 'ember';

export function fromTo(params/*, hash*/) {
  let [ model, direction] = params;

  if(!model || !model.routes || !direction){ return; }

  if(direction === 'from'){
    return model.routes[0].route_parts[0].from_point_name;
  } else if(direction === 'to'){
    return model.routes[0].route_parts.last().to_point_name;
  }


}

export default Ember.Helper.helper(fromTo);
