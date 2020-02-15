"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
class Servico extends Sequelize.Model {
}
exports.Servico = Servico;
Servico.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tempoMedioAtendimento: {
        type: Sequelize.DOUBLE
    }
}, {
    sequelize: db_1.default,
    modelName: 'servico'
});
