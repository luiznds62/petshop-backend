
import Sequelize from 'sequelize'
import db from '../../database/db'
import Pessoa from './Pessoa';
import Endereco from './Endereco';

class Cliente extends Sequelize.Model { }
Cliente.init({
    idPessoa: {
        type: Sequelize.BIGINT,
        references: {
            model: Pessoa,
            key: 'id'
        }
    },
    idEndereco: {
        type: Sequelize.BIGINT,
        references: {
            model: Endereco,
            key: 'id'
        }
    },
    telefonePrincipal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefoneAlternativo: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'cliente'
});

export default Cliente