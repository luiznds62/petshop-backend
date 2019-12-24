const Model = Sequelize.Model;
class Endereco extends Model { }
Endereco.init({
    rua: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cidade: {
        type: Sequelize.BIGINT,
        references: {
            model: Cidade,
            key: 'id'
        },
        allowNull: false
    },
    bairro: {
        type: Sequelize.BIGINT,
        references: {
            model: Bairro,
            key: 'id'
        },
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'endereco'
});