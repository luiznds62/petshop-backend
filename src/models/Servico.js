import Sequelize from 'sequelize'
import db from '../../database/db'

class Servico extends Sequelize.Model { }
Servico.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    tempoMedioAtendimento: {
        type: Sequelize.NUMBER
    }
}, {
    sequelize: db,
    modelName: 'servico'
});

export default Servico