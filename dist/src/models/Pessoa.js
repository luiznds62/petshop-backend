"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
class Pessoa extends Sequelize.Model {
}
exports.Pessoa = Pessoa;
Pessoa.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    rg: {
        type: Sequelize.BIGINT,
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    genero: {
        type: Sequelize.ENUM,
        values: ['masculino', 'feminino', 'outros'],
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'pessoa'
});
