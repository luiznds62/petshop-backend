
import Sequelize from 'sequelize'
import db from '../../database/db'
import Cliente from '../models/Cliente'
import Servico from '../models/Servico'
import Animal from '../models/Animal'

class Agendamento extends Sequelize.Model { }
Agendamento.init({
    clienteId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cliente,
            key: 'id'
        },
        allowNull: false
    },
    servicoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Servico,
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
    sequelize: db,
    modelName: 'agendamento'
});

Agendamento.belongsTo(Cliente)
Agendamento.belongsTo(Servico)

export default Agendamento