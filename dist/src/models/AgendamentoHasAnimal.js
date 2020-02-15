"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Agendamento_1 = require("./Agendamento");
const Animal_1 = require("./Animal");
class AgendamentoHasAnimal extends Sequelize.Model {
}
exports.AgendamentoHasAnimal = AgendamentoHasAnimal;
AgendamentoHasAnimal.init({
    agendamentoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Agendamento_1.Agendamento,
            key: 'id'
        },
        allowNull: false
    },
    animalId: {
        type: Sequelize.BIGINT,
        references: {
            model: Animal_1.Animal,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'agendamentoHasAnimal'
});
AgendamentoHasAnimal.belongsTo(Agendamento_1.Agendamento);
AgendamentoHasAnimal.belongsTo(Animal_1.Animal);
