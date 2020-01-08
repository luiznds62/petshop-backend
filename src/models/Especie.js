import Sequelize from 'sequelize'
import db from '../../database/db'

class Especie extends Sequelize.Model { }
Especie.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT
    }
}, {
    sequelize: db,
    modelName: 'especie'
});

export default Especie