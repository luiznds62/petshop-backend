import Sequelize from 'sequelize'
import db from '../../database/db'
import Cidade from './Cidade';

class Bairro extends Sequelize.Model { }
Bairro.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idCidade: {
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

export default Bairro