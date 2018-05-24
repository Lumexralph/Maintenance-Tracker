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

  static getAllData() {
    return new Promise((resolve, reject) => {
      const allData = [];
      localDataStore.forEach((value, key) => {
        allData.push({
          id: String(key),
          requests: value,
        });
      });

      if (allData) {
        resolve(allData);
      }

      reject(new Error('Error fetching all data'));
    });
  }

  // check to know if we have a valid Id for request
  static validateId(requestId) {
    return localDataStore.has(requestId);
  }

  // get a value by id
  static getById(stringRequestId) {
    return new Promise((resolve, reject) => {
      const requestId = Number(stringRequestId);
      // validate the id
      if (!DataStorageSystem.validateId(requestId)) {
        reject(new Error('Id could not be validated'));
      }


      const data = localDataStore.get(Number(requestId));

      if (data) {
        resolve(data);
      }

      reject(new Error('Error occurred while fetching data'));
    });
  }

  // get a value by id and update it
  static getByIdAndUpdate(stringRequestId, data) {
    return new Promise((resolve, reject) => {
      const requestId = Number(stringRequestId);
      // validate the id
      if (!DataStorageSystem.validateId(requestId)) {
        reject(new Error('Id could not be found'));
      }

      // get the data
      const storageData = localDataStore.get(requestId);
      const { title, content, department } = data;

      // update the part that needs to be updated
      storageData.title = title;
      storageData.content = content;
      storageData.department = department;

      localDataStore.set(requestId, storageData);
      const newData = localDataStore.get(requestId);

      if (newData) {
        resolve(newData);
      }

      reject(new Error('Data could not be updated'));
    });
  }


  static getDataSize() {
    return localDataStore.size;
  }
}

export default DataStorageSystem;
