import Sequelize from 'sequelize'
import db from '../../database/db'
import Especie from './Especie';
import Raca from './Raca';
import Cliente from './Cliente';


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
    idCliente: {
        type: Sequelize.BIGINT,
        references: {
            model: Cliente,
            key: 'id'
        }
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