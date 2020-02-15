"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
class Raca extends Sequelize.Model {
}
exports.Raca = Raca;
Raca.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT
    }
}, {
    sequelize: db_1.default,
    modelName: 'raca'
});
