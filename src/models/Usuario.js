
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
  },
  tokenResetarSenha: {
    type: Sequelize.STRING,
    defaultValue: ''
  },
  expiracaoToken: {
    type: Sequelize.DATE,
    defaultValue: new Date(1800)
  }
}, {
  sequelize: db,
  modelName: 'usuario'
});

export default Usuario