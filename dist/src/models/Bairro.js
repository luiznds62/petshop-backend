"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Cidade_1 = require("./Cidade");
class Bairro extends Sequelize.Model {
}
exports.Bairro = Bairro;
Bairro.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidadeId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cidade_1.Cidade,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'bairro'
});
Bairro.belongsTo(Cidade_1.Cidade);
//# sourceMappingURL=Bairro.js.map