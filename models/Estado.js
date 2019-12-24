const Model = Sequelize.Model;
class Estado extends Model { }
Estado.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sigla: {
        type: Sequelize.STRING(2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'estado'
});