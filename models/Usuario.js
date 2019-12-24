const Model = Sequelize.Model;
class Usuario extends Model { }
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
  perfil: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'usuario'
  // options
});