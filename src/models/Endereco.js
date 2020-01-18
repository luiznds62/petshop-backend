import Sequelize from 'sequelize'
import db from '../../database/db'
import Bairro from './Bairro'
import Cidade from './Cidade'

class Endereco extends Sequelize.Model { }
Endereco.init({
    rua: {
        type: Sequelize.STRING,
        allowNull: false
    },
    complemento: {
        type: Sequelize.STRING,
        defaultValue: ""
    },
    numero: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cep: {
        type: Sequelize.INTEGER
    },
    cidadeId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cidade,
            key: 'id'
        },
        allowNull: false
    },
    bairroId: {
        type: Sequelize.BIGINT,
        references: {
            model: Bairro,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'endereco'
});

Endereco.belongsTo(Cidade)
Endereco.belongsTo(Bairro)

export default Endereco