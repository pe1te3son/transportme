import Ember from 'ember';

export function uniqList(params/*, hash*/) {

  const [ $array, $key, $optional ] = params;
  console.log($optional);

  if(!$optional){
      console.log($array);
    if($array){
      return $array.getEach($key).uniq();
    }
  }
  return $optional.getEach($key).uniq();





}

export default Ember.Helper.helper(uniqList);
