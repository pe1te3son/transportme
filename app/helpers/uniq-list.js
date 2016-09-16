import Ember from 'ember';

export function uniqList(params/*, hash*/) {

  const [ $array, $key, $optional ] = params;

  if(!$optional){
    if($array){
      return $array.getEach($key).uniq();
    }
  }
  return $optional.getEach($key).uniq();

}

export default Ember.Helper.helper(uniqList);
