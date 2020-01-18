
import Sequelize from 'sequelize'
import db from '../../database/db'
import Pessoa from './Pessoa';
import Endereco from './Endereco';

class Cliente extends Sequelize.Model { }
Cliente.init({
    pessoaId: {
        type: Sequelize.BIGINT,
        references: {
            model: Pessoa,
            key: 'id'
        }
    },
    enderecoId: {
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

Cliente.belongsTo(Pessoa)
Cliente.belongsTo(Endereco)

export default Cliente