const localDataStore = new Map();
let id = 0;

class DataStorageSystem {
  static createData(data) {
    id += 1;   // new id of data
    const currentId = id;

    localDataStore.set(currentId, data);
    console.log(`Data successfully created with ${JSON.stringify(localDataStore.get(currentId))}`);
  }

  static getDataSize() {
    return localDataStore.size;
  }
}

export default DataStorageSystem ;
