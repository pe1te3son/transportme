import Ember from 'ember';

/* global idb */
export default Ember.Service.extend({
  dbPromised: null,
  openDb($data){
    let { dbName, version, store} = $data;

    let dbPromised = idb.open(dbName, version, upgradeDB => { // jshint ignore:line
      upgradeDB.createObjectStore(store);
      console.log('db open in');
    }).then(()=>{
      console.log('db open out');
    });
  },

  saveToDb($dbName, $dataObject){

    let { key, value, store } = $dataObject;

    if(!value || !key || !store){ return; }

    let dbPromised = idb.open($dbName).then((db)=>{ // jshint ignore:line
      console.log(db);
      let tx = db.transaction(store, 'readwrite');
      let storeToSaveInto = tx.objectStore(store);
      storeToSaveInto.put(value, key);
      return tx.complete;
    }).then(()=>{
      console.log('Item added');
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
