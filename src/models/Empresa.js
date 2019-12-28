import Sequelize from 'sequelize'
import db from '../../database/db'
import Endereco from './Endereco'

class Empresa extends Sequelize.Model { }
Empresa.init({
    razaoSocial: {
        type: Sequelize.STRING,
    },
    nomeFantasia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    logo: {
        type: Sequelize.STRING
    },
    cpfCnpj: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    habilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    dataInicioUso: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    idEndereco: {
        type: Sequelize.BIGINT,
        references: {
            model: Endereco,
            key: 'id'
        },
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'empresa'
});

export default Empresa