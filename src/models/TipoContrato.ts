import * as Sequelize from 'sequelize'
import db from '../../database/db'

export class TipoContrato extends Sequelize.Model { }
TipoContrato.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING
    }
}, {
    sequelize: db,
    modelName: 'tipoContrato'
});
