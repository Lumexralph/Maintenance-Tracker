

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _express = require('express');

const _express2 = _interopRequireDefault(_express);

const _api = require('./api/api-1');

const _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use('/api/v1', _api2.default);

if (!module.parent) {
  app.listen(3000, () => console.log('Started on port 3000'));
}

exports.default = app;
