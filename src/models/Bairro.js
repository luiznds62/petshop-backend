import Sequelize from 'sequelize'
import db from '../../database/db'

class Bairro extends Sequelize.Model { }
Bairro.init({
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'bairro'
});