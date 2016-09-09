import Ember from 'ember';

/* global idb */
export default Ember.Service.extend({
  dbPromised: null,
  openDb($data){
    let { dbName, version, store} = $data;

    return idb.open(dbName, version, upgradeDB => {
      upgradeDB.createObjectStore(store);
      console.log(`"${dbName}" CREATED!`);
    }).then(()=>{
      console.log(`"${dbName}" opened!`);
    });
  },

  saveToDb($dbName, $dataObject){

    let { key, value, store } = $dataObject;

    if(!value || !key || !store){ return; }

    return idb.open($dbName).then((db)=>{
      let tx = db.transaction(store, 'readwrite');
      let storeToSaveInto = tx.objectStore(store);
      storeToSaveInto.put(value, key);
      return tx.complete;
    }).then(()=>{
      console.log(`"${key}" saved into "${$dbName}"`);
    });

  },

  deleteDb($database){
    /* global indexedDB */
    indexedDB.deleteDatabase($database);
    console.log(`"${$database}" deleted!`);
  },

  getRoutes($dbInfo){
    let { dbName, store } = $dbInfo;

    return idb.open(dbName).then((db)=>{
      let tx = db.transaction(store);
      let routesStore = tx.objectStore(store);
      return routesStore.getAll();
    });

  }
});
