"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Cliente_1 = require("../models/Cliente");
const Servico_1 = require("../models/Servico");
class Agendamento extends Sequelize.Model {
}
exports.Agendamento = Agendamento;
Agendamento.init({
    clienteId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cliente_1.Cliente,
            key: 'id'
        },
        allowNull: false
    },
    servicoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Servico_1.Servico,
            key: 'id'
        },
        allowNull: false
    },
    dia: {
        type: Sequelize.ENUM,
        values: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'],
        allowNull: false
    },
    horarioInicio: {
        type: Sequelize.DATE,
        allowNull: false
    },
    horarioFim: {
        type: Sequelize.DATE,
        allowNull: false
    },
    observacao: {
        type: Sequelize.STRING
    },
}, {
    sequelize: db_1.default,
    modelName: 'agendamento'
});
Agendamento.belongsTo(Cliente_1.Cliente);
Agendamento.belongsTo(Servico_1.Servico);
//# sourceMappingURL=Agendamento.js.map