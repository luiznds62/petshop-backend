'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _materia = require('../models/materia.model');

var _materia2 = _interopRequireDefault(_materia);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.getAll = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var materias;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _materia2.default.getAll();

                    case 3:
                        materias = _context.sent;

                        _appLogger2.default.info('sending all materias...');
                        res.send({ sucess: true, message: "", object: materias });
                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        _appLogger2.default.error('Error in getting materias- ' + _context.t0);
                        res.send({ sucess: false, message: "Erro ao buscar: " + _context.t0, object: [] });

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 8]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

controller.updateMateria = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var materiaToUpdate, updatedMateria;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        materiaToUpdate = _materia2.default.findOne({ nome: req.body.nome });
                        _context2.prev = 1;

                        materiaToUpdate = req.body;
                        _context2.next = 5;
                        return _materia2.default.updateMateria(materiaToUpdate);

                    case 5:
                        updatedMateria = _context2.sent;

                        _appLogger2.default.info('Updating materia...');
                        res.send({ sucess: true, message: "Atualizado com sucesso", object: updatedMateria });
                        _context2.next = 14;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](1);

                        _appLogger2.default.error('Error in getting materias- ' + _context2.t0);
                        res.send({ sucess: false, message: "Erro ao atualizar: " + _context2.t0, object: [] });

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 10]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

controller.addMateria = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var materiaToAdd, savedMateria;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        materiaToAdd = (0, _materia2.default)({
                            nome: req.body.nome,
                            professor: req.body.professor,
                            fase: req.body.fase,
                            sala: req.body.sala,
                            bloco: req.body.bloco,
                            urlImg: req.body.urlImg
                        });
                        _context3.prev = 1;
                        _context3.next = 4;
                        return _materia2.default.addMateria(materiaToAdd);

                    case 4:
                        savedMateria = _context3.sent;

                        _appLogger2.default.info('Adding materia...');
                        res.send({ sucess: true, message: "Adicionado com sucesso", object: savedMateria });
                        _context3.next = 13;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](1);

                        _appLogger2.default.error('Error in getting materias- ' + _context3.t0);
                        res.send({ sucess: false, message: "Erro ao adicionar: " + _context3.t0, object: [] });

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 9]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

controller.deleteMateria = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var nomeMateria, removedMateria;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        nomeMateria = req.body.nome;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return _materia2.default.removeMateria(nomeMateria);

                    case 4:
                        removedMateria = _context4.sent;

                        _appLogger2.default.info('Deleted Materia- ' + removedMateria);
                        res.send({ sucess: true, message: "Removido com sucesso", object: removedMateria });
                        _context4.next = 13;
                        break;

                    case 9:
                        _context4.prev = 9;
                        _context4.t0 = _context4['catch'](1);

                        _appLogger2.default.error('Failed to delete materia- ' + _context4.t0);
                        res.send({ sucess: false, message: "Erro ao deletar" + _context4.t0, object: [] });

                    case 13:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1, 9]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

exports.default = controller;