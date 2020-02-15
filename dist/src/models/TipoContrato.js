"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
class TipoContrato extends Sequelize.Model {
}
exports.TipoContrato = TipoContrato;
TipoContrato.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING
    }
}, {
    sequelize: db_1.default,
    modelName: 'tipoContrato'
});
