const localDataStore = new Map();
let id = 0;

class DataStorageSystem {
  static createData(data) {
    return new Promise((resolve, reject) => {
      localDataStore.set(id += 1, data);
      const newData = localDataStore.get(id);

      if (newData) {
        resolve(newData);
      }

      reject(new Error('Data Could not be saved'));
    });
  }

  static getDataSize() {
    return localDataStore.size;
  }
}

export default DataStorageSystem;
