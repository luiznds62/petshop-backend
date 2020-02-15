"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
class Especie extends Sequelize.Model {
}
exports.Especie = Especie;
Especie.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT
    }
}, {
    sequelize: db_1.default,
    modelName: 'especie'
});
