"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var localDataStore = new Map();
var id = 0;

var DataStorageSystem = function () {
  function DataStorageSystem() {
    _classCallCheck(this, DataStorageSystem);
  }

  _createClass(DataStorageSystem, null, [{
    key: "createData",
    value: function createData(data) {
      localDataStore.set(id += 1, data);
      return "Data successfully created with id " + id;
    }
  }, {
    key: "getDataSize",
    value: function getDataSize() {
      return localDataStore.size;
    }
  }]);

  return DataStorageSystem;
}();