import * as Sequelize from 'sequelize'
import db from '../../database/db'
import { Cidade } from './Cidade';

export class Bairro extends Sequelize.Model { }
Bairro.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cidadeId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cidade,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'bairro'
});

Bairro.belongsTo(Cidade)

