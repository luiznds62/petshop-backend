"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Endereco_1 = require("./Endereco");
class Empresa extends Sequelize.Model {
}
exports.Empresa = Empresa;
Empresa.init({
    razaoSocial: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    nomeFantasia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    logo: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    cpfCnpj: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    site: {
        type: Sequelize.STRING
    },
    dataAbertura: {
        type: Sequelize.DATE
    },
    email: {
        type: Sequelize.STRING
    },
    habilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    dataInicioUso: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    enderecoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Endereco_1.Endereco,
            key: 'id'
        }
    }
}, {
    sequelize: db_1.default,
    modelName: 'empresa'
});
Empresa.belongsTo(Endereco_1.Endereco);
//# sourceMappingURL=Empresa.js.map