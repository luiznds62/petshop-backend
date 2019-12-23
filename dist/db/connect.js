'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _config = require('../core/config/config.dev');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise;

var connectToDb = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var dbHost, dbPort, dbName;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        dbHost = _config2.default.dbHost;
                        dbPort = _config2.default.dbPort;
                        dbName = _config2.default.dbName;
                        _context.prev = 3;
                        _context.next = 6;
                        return _mongoose2.default.connect('mongodb+srv://root:12598@financial-tyiml.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

                    case 6:
                        _appLogger2.default.info('Connected to mongo!!!');
                        _context.next = 12;
                        break;

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](3);

                        _appLogger2.default.error('Could not connect to MongoDB' + _context.t0);

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[3, 9]]);
    }));

    return function connectToDb() {
        return _ref.apply(this, arguments);
    };
}();

exports.default = connectToDb;