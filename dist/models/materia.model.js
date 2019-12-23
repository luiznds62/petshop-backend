'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MateriaSchema = _mongoose2.default.Schema({
    nome: { type: String, required: true, unique: true, index: true },
    professor: { type: String, required: true },
    fase: { type: String, required: true },
    sala: { type: String, required: true },
    bloco: { type: String, required: true },
    urlImg: { type: String, required: true }
}, { collection: 'Materia' });

var MateriaModel = _mongoose2.default.model('Materia', MateriaSchema);

MateriaModel.getAll = function () {
    return MateriaModel.find({});
};

MateriaModel.updateMateria = function (materia) {
    return MateriaModel.updateOne(materia);
};

MateriaModel.addMateria = function (materia) {
    return MateriaModel.create(materia);
};

MateriaModel.removeMateria = function (nomeMateria) {
    return MateriaModel.remove({ nome: nomeMateria });
};

exports.default = MateriaModel;