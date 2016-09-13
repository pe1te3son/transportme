import Ember from 'ember';

/* global idb */
export default Ember.Service.extend({

  createIndexedDbStore($dbData){
    let { $dbName, $dbStore, $dbVersion } = $dbData;

    return idb.open($dbName,  $dbVersion, upgradeDB => {
      upgradeDB.createObjectStore($dbStore).createIndex('by-date', 'request_time');
      console.log(`"${$dbName}" CREATED!`);

    }).then(()=>{
      console.log(`"${$dbName}" opened!`);
    });
  },

  saveToDb($data){

    const { $dbName, $dbStore, $key, $value } = $data;

    if(!$key || !$value){ return; }

    return idb.open($dbName).then((db)=>{
      let tx = db.transaction($dbStore, 'readwrite');
      let storeToSaveInto = tx.objectStore($dbStore);
      storeToSaveInto.put($value, $key);
      return tx.complete;
    }).then(()=>{
      console.log(`"${$key}" saved into "${$dbName}->[${$dbStore}]"`);
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

  }
});
