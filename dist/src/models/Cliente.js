"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Pessoa_1 = require("./Pessoa");
const Endereco_1 = require("./Endereco");
class Cliente extends Sequelize.Model {
}
exports.Cliente = Cliente;
Cliente.init({
    pessoaId: {
        type: Sequelize.BIGINT,
        references: {
            model: Pessoa_1.Pessoa,
            key: 'id'
        }
    },
    enderecoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Endereco_1.Endereco,
            key: 'id'
        }
    },
    telefonePrincipal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefoneAlternativo: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'cliente'
});
Cliente.belongsTo(Pessoa_1.Pessoa);
Cliente.belongsTo(Endereco_1.Endereco);
