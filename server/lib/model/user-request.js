'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

exports.default = UserRequest;