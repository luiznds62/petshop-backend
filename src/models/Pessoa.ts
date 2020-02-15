
import * as Sequelize from 'sequelize'
import db from '../../database/db'

export class Pessoa extends Sequelize.Model { }
Pessoa.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    rg: {
        type: Sequelize.BIGINT,
    },
    dataNascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    genero: {
        type: Sequelize.ENUM,
        values: ['masculino', 'feminino', 'outros'],
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'pessoa'
});

 