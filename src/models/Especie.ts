import * as Sequelize from 'sequelize'
import db from '../../database/db'

export class Especie extends Sequelize.Model { }
Especie.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT
    }
}, {
    sequelize: db,
    modelName: 'especie'
});
