import * as Sequelize from 'sequelize'
import db from '../../database/db'
import { Especie } from './Especie';
import { Raca } from './Raca';
import { Cliente } from './Cliente';

export class Animal extends Sequelize.Model { }
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
            model: Cliente,
            key: 'id'
        }
    },
    especieId: {
        type: Sequelize.BIGINT,
        references: {
            model: Especie,
            key: 'id'
        },
        allowNull: false
    },
    racaId: {
        type: Sequelize.BIGINT,
        references: {
            model: Raca,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'animal'
});

Animal.belongsTo(Cliente)
Animal.belongsTo(Especie)
Animal.belongsTo(Raca)