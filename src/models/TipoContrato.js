import Sequelize from 'sequelize'
import db from '../../database/db'

class TipoContrato extends Sequelize.Model { }
TipoContrato.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING
    }
}, {
    sequelize: db,
    modelName: 'tipocontrato'
});

export default TipoContrato