import Sequelize from 'sequelize'
import db from '../../database/db'
import Especie from './especie';
import Raca from './Raca';

class Animal extends Sequelize.Model { }
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
    idEspecie: {
        type: Sequelize.BIGINT,
        references: {
            model: Especie,
            key: 'id'
        },
        allowNull: false
    },
    idRaca: {
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

export default Animal