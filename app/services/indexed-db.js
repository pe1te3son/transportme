import Ember from 'ember';

/* global idb */
export default Ember.Service.extend({
  dbName: 'transportme-v1',
  version: 1,
  createIndexedDbStore($store){

    return idb.open(this.get('dbName'), this.get('version'), upgradeDB => {
      upgradeDB.createObjectStore($store);
      console.log(`"${$store}" CREATED!`);
    }).then(()=>{
      console.log(`"${this.get('dbName')}" opened!`);
    });
  },

  saveToDb($store, $dataObject){

    let { key, value } = $dataObject;

    if(!value || !key || !$store){ return; }

    return idb.open(this.get('dbName')).then((db)=>{
      let tx = db.transaction($store, 'readwrite');
      let storeToSaveInto = tx.objectStore($store);
      storeToSaveInto.put(value, key);
      return tx.complete;
    }).then(()=>{
      console.log(`"${key}" saved into "${this.get('dbName')}->[${$store}]"`);
    });

  },

  deleteDb($database){
    /* global indexedDB */
    indexedDB.deleteDatabase($database);
    console.log(`"${$database}" deleted!`);
  },

  getRoutes($store){

    return idb.open(this.get('dbName')).then((db)=>{
      let tx = db.transaction($store);
      let routesStore = tx.objectStore($store);
      return routesStore.getAll();
    });

  }
});
