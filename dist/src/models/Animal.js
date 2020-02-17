"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Especie_1 = require("./Especie");
const Raca_1 = require("./Raca");
const Cliente_1 = require("./Cliente");
class Animal extends Sequelize.Model {
}
exports.Animal = Animal;
Animal.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: Sequelize.DATE
    },
    cor: {
        type: Sequelize.STRING
    },
    genero: {
        type: Sequelize.ENUM,
        values: ['M', 'F'],
        allowNull: false
    },
    porte: {
        type: Sequelize.ENUM,
        values: ['Mini/Anão', 'Pequeno', 'Médio', 'Grande', 'Gigante'],
        allowNull: false
    },
    peso: {
        type: Sequelize.DOUBLE
    },
    temperamento: {
        type: Sequelize.ENUM,
        values: ['Calmo', 'Agressivo'],
        defaultValue: 'Calmo'
    },
    clienteId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cliente_1.Cliente,
            key: 'id'
        }
    },
    especieId: {
        type: Sequelize.BIGINT,
        references: {
            model: Especie_1.Especie,
            key: 'id'
        },
        allowNull: false
    },
    racaId: {
        type: Sequelize.BIGINT,
        references: {
            model: Raca_1.Raca,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db_1.default,
    modelName: 'animal'
});
Animal.belongsTo(Cliente_1.Cliente);
Animal.belongsTo(Especie_1.Especie);
Animal.belongsTo(Raca_1.Raca);
//# sourceMappingURL=Animal.js.map