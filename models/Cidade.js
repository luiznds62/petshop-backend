const Model = Sequelize.Model;
class Cidade extends Model { }
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
    sequelize,
    modelName: 'cidade'
});