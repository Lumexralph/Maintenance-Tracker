

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _createClass = (function () { function defineProperties(target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }());

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

const localDataStore = new Map();
let id = 0;

const DataStorageSystem = (function () {
  function DataStorageSystem() {
    _classCallCheck(this, DataStorageSystem);
  }

  _createClass(DataStorageSystem, null, [{
    key: 'createData',
    value: function createData(data) {
      return new Promise(((resolve, reject) => {
        localDataStore.set(id += 1, data);
        const newData = localDataStore.get(id);

        if (newData) {
          resolve(newData);
        }

        reject(new Error('Data Could not be saved'));
      }));
    },
  }, {
    key: 'getAllData',
    value: function getAllData() {
      return new Promise(((resolve, reject) => {
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
      }));
    },

    // check to know if we have a valid Id for request

  }, {
    key: 'validateId',
    value: function validateId(requestId) {
      return localDataStore.has(requestId);
    },

    // get a value by id

  }, {
    key: 'getById',
    value: function getById(stringRequestId) {
      return new Promise(((resolve, reject) => {
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
      }));
    },

    // get a value by id and update it

  }, {
    key: 'getByIdAndUpdate',
    value: function getByIdAndUpdate(stringRequestId, data) {
      return new Promise(((resolve, reject) => {
        const requestId = Number(stringRequestId);
        // validate the id
        if (!DataStorageSystem.validateId(requestId)) {
          reject(new Error('Id could not be found'));
        }

        // get the data
        const storageData = localDataStore.get(requestId);
        let title = data.title,
          content = data.content,
          department = data.department;

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
      }));
    },
  }, {
    key: 'getDataSize',
    value: function getDataSize() {
      return localDataStore.size;
    },
  }]);

  return DataStorageSystem;
}());

exports.default = DataStorageSystem;
