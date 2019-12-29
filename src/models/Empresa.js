import Sequelize from 'sequelize'
import db from '../../database/db'
import Endereco from './Endereco'

class Empresa extends Sequelize.Model { }
Empresa.init({
    razaoSocial: {
        type: Sequelize.STRING,
        defaultValue: ''
    },
    nomeFantasia: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    logo: {
        type: Sequelize.STRING,
        defaultValue: ''
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
        }
    }
}, {
    sequelize: db,
    modelName: 'empresa'
});

export default Empresa