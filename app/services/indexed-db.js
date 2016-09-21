import Ember from 'ember';

/* global idb */
export default Ember.Service.extend({

  createIndexedDbStore($dbData){
    let { $dbName, $dbStore, $dbVersion, $keyPath, $index } = $dbData;

    return idb.open($dbName,  $dbVersion, upgradeDB => {

      if($keyPath){
        if($index){
          upgradeDB.createObjectStore($dbStore, {keyPath: $keyPath}).createIndex($index[0], $index[1]);
        } else {
          upgradeDB.createObjectStore($dbStore, {keyPath: $keyPath});
        }
      }else {
        upgradeDB.createObjectStore($dbStore);
      }

      console.log(`"${$dbName}" CREATED!`);

    }).then(()=>{
      console.log(`"${$dbName}" opened!`);
    });
  },

  saveToDb($data){

    const { $dbName, $dbStore, $key, $value } = $data;

    if(!$value){ return; }

    return idb.open($dbName).then((db)=>{
      let tx = db.transaction($dbStore, 'readwrite');
      let storeToSaveInto = tx.objectStore($dbStore);

      if($key){
        storeToSaveInto.put($value, $key);
      } else {
        storeToSaveInto.put($value);
      }

      // Remove oldest
      if($dbStore === 'recent'){
        storeToSaveInto.index('by-date').openCursor(null , 'prev').then((cursor)=>{
          return cursor.advance(15);
        }).then(function deleteRest(cursor){
          if(!cursor){ return; }
          cursor.delete();
          return cursor.continue().then(deleteRest);
        });
      }

      return tx.complete;
    });

  },

  deleteDb($database){
    /* global indexedDB */
    indexedDB.deleteDatabase($database);
    console.log(`"${$database}" deleted!`);
  },

  getRoutes($db){

    const { $dbName, $dbStore } = $db;

    return idb.open($dbName).then((db)=>{
      const tx = db.transaction( $dbStore, 'readonly');
      const routesStore = tx.objectStore( $dbStore);
      return routesStore.getAll();
    });

  },

  removeById($db){
    const { $dbName, $dbStore, $id } = $db;

    return idb.open($dbName).then((db)=>{
      const tx = db.transaction($dbStore, 'readwrite');
      return tx.objectStore($dbStore).delete($id);
    });
  },

  getById($db){
    const { $dbName, $dbStore, $id } = $db;

    return idb.open($dbName).then((db)=>{
      const tx = db.transaction($dbStore, 'readwrite');
      return tx.objectStore($dbStore).get($id);
    });
  }
});
