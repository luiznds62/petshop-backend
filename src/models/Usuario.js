
import Sequelize from 'sequelize'
import db from '../../database/db'

class Usuario extends Sequelize.Model { }
Usuario.init({
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'usuario'
});

export default Usuario