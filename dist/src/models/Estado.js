"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
class Estado extends Sequelize.Model {
}
exports.Estado = Estado;
Estado.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sigla: {
        type: Sequelize.STRING(2),
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'estado'
});
