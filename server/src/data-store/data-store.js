const localDataStore = new Map();
let id = 0;

class DataStorageSystem {
  static createData(data) {
    localDataStore.set(id += 1, data);
    return `Data successfully created with id ${id}`;
  }

  static getDataSize() {
    return localDataStore.size;
  }
}
