"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
class Usuario extends Sequelize.Model {
}
exports.Usuario = Usuario;
Usuario.init({
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tokenResetarSenha: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    expiracaoToken: {
        type: Sequelize.DATE,
        defaultValue: new Date(1800)
    }
}, {
    sequelize: db_1.default,
    modelName: 'usuario'
});
