"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Bairro_1 = require("./Bairro");
const Cidade_1 = require("./Cidade");
class Endereco extends Sequelize.Model {
}
exports.Endereco = Endereco;
Endereco.init({
    rua: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cep: {
        type: Sequelize.INTEGER
    },
    cidadeId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cidade_1.Cidade,
            key: 'id'
        },
        allowNull: false
    },
    bairroId: {
        type: Sequelize.BIGINT,
        references: {
            model: Bairro_1.Bairro,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'endereco'
});
Endereco.belongsTo(Cidade_1.Cidade);
Endereco.belongsTo(Bairro_1.Bairro);
