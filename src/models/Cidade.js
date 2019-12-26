import Sequelize from 'sequelize'
import Estado from '../models/Estado'
import db from '../../database/db'

class Cidade extends Sequelize.Model { }
Cidade.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    uf: {
        type: Sequelize.BIGINT,
        references: {
            model: Estado,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'cidade'
});

export default Cidade