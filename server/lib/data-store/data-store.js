'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var localDataStore = new Map();
var id = 0;

var DataStorageSystem = function () {
  function DataStorageSystem() {
    _classCallCheck(this, DataStorageSystem);
  }

  _createClass(DataStorageSystem, null, [{
    key: 'createData',
    value: function createData(data) {
      return new Promise(function (resolve, reject) {
        localDataStore.set(id += 1, data);
        var newData = localDataStore.get(id);

        if (newData) {
          resolve(newData);
        }

        reject(new Error('Data Could not be saved'));
      });
    }
  }, {
    key: 'getAllData',
    value: function getAllData() {
      return new Promise(function (resolve, reject) {
        var allData = [];
        localDataStore.forEach(function (value, key) {
          allData.push({
            id: String(key),
            requests: value
          });
        });

        if (allData) {
          resolve(allData);
        }

        reject(new Error('Error fetching all data'));
      });
    }
  }, {
    key: 'getDataSize',
    value: function getDataSize() {
      return localDataStore.size;
    }
  }]);

  return DataStorageSystem;
}();

exports.default = DataStorageSystem;