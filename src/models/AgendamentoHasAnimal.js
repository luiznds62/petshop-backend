
import Sequelize from 'sequelize'
import db from '../../database/db'
import Agendamento from './Agendamento';
import Animal from './Animal';

class AgendamentoHasAnimal extends Sequelize.Model { }
AgendamentoHasAnimal.init({
    agendamentoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Agendamento,
            key: 'id'
        },
        allowNull: false
    },
    animalId: {
        type: Sequelize.BIGINT,
        references: {
            model: Animal,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'agendamentoHasAnimal'
});

AgendamentoHasAnimal.belongsTo(Agendamento)
AgendamentoHasAnimal.belongsTo(Animal)

export default AgendamentoHasAnimal