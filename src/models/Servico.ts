import * as Sequelize from 'sequelize'
import db from '../../database/db'

export class Servico extends Sequelize.Model { }
Servico.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    tempoMedioAtendimento: {
        type: Sequelize.DOUBLE
    }
}, {
    sequelize: db,
    modelName: 'servico'
});