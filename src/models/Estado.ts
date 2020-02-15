import * as Sequelize from 'sequelize'
import db from '../../database/db'

export class Estado extends Sequelize.Model { }
Estado.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sigla: {
        type: Sequelize.STRING(2),
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'estado'
});
