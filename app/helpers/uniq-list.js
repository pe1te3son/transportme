import Ember from 'ember';

/**
* @name Uniq List helper
* @desc Return list with no duplicates. If optional 'null'. Filters duplicates
* from $object based on $property value. If $optional array set it ignores other
* values
* @param { Array } params - object, object property, optional array
* @return array
*/
export function uniqList (params/*, hash */) {
  const [ $object, $property, $optional ] = params;

  if (!$optional) {
    if ($object) {
      return $object.getEach($property).uniq();
    }
  }
  return $optional.getEach($property).uniq();
}

export default Ember.Helper.helper(uniqList);
