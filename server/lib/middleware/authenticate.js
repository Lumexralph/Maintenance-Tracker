

Object.defineProperty(exports, '__esModule', {
  value: true,
});

const _userDatastore = require('../data-store/user-datastore');

const _userDatastore2 = _interopRequireDefault(_userDatastore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const authenticate = function authenticate(req, res, next) {
  const token = req.header('x-auth');

  // check the token
  _userDatastore2.default.findByToken(token).then((user) => {
    req.user = user;
    req.token = token;
    next();
  }, err => res.status(401).send({ message: err.message }));
};

exports.default = authenticate;
