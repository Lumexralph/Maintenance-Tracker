const localDataStore = new Map();
let id = 0;

class DataStorageSystem {
  static createData(data) {
    return new Promise((resolve, reject) => {
      
      localDataStore.set(id += 1, data);
      let newData = localDataStore.get(id);
      if(newData) {
        let stringData = JSON.stringify(newData);
        resolve(newData);
      } else {
        reject(new Error('Data could not be saved'));
      }
      
    });
  }

  static getDataSize() {
    return localDataStore.size;
  }
}

export default DataStorageSystem ;
