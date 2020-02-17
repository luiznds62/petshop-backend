import * as Sequelize from 'sequelize'
import db from '../../database/db'
import { Especie } from './Especie';

export class Raca extends Sequelize.Model { }
Raca.init({
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT
    }
}, {
    sequelize: db,
    modelName: 'raca'
});