import Ember from 'ember';

export function uniqList(params/*, hash*/) {
  const [ $array, $key ] = params;

  if($array){
    return $array.getEach($key).uniq();
  }


}

export default Ember.Helper.helper(uniqList);
