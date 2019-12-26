import Sequelize from 'sequelize'
import db from '../../database/db'
import Cidade from './Cidade';

class Bairro extends Sequelize.Model { }
Bairro.init({
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    idCidade: {
        type: Sequelize.BIGINT,
        references: {
            model: Cidade,
            key: 'id'
        },
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'bairro'
});