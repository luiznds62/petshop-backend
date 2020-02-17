"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const Estado_1 = require("../models/Estado");
const db_1 = require("../../database/db");
class Cidade extends Sequelize.Model {
}
exports.Cidade = Cidade;
Cidade.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    estadoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Estado_1.Estado,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'cidade'
});
Cidade.belongsTo(Estado_1.Estado);
//# sourceMappingURL=Cidade.js.map