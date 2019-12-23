"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _materia = require("../controllers/materia.controller");

var _materia2 = _interopRequireDefault(_materia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
    _materia2.default.getAll(req, res);
});

router.put('/', function (req, res) {
    _materia2.default.updateMateria(req, res);
});

router.post('/', function (req, res) {
    _materia2.default.addMateria(req, res);
});

router.delete('/', function (req, res) {
    _materia2.default.deleteMateria(req, res);
});

exports.default = router;