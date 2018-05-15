'use strict';

var _dataStore = require('../data-store/data-store');

var _dataStore2 = _interopRequireDefault(_dataStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// create a class for every request

var UserRequest = function UserRequest(title, content) {
  var department = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Maintenance';

  _classCallCheck(this, UserRequest);

  this.title = title;
  this.department = department;
  this.content = content;
  this.requestStatus = 'accept';
  this.resolved = false;
  this.dateCreated = new Date().toDateString();
};