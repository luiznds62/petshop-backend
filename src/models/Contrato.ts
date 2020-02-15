
import * as Sequelize from 'sequelize'
import db from '../../database/db'
import { Servico } from './Servico';
import { TipoContrato } from './TipoContrato';
import { Cliente } from './Cliente';

export class Contrato extends Sequelize.Model { }
Contrato.init({
    clienteId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cliente,
            key: 'id'
        },
        allowNull: false
    },
    tipoContratoId: {
        type: Sequelize.BIGINT,
        references: {
            model: TipoContrato,
            key: 'id'
        },
        allowNull: false
    },
    servicoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Servico,
            key: 'id'
        },
        allowNull: false
    },
    observacao: {
        type: Sequelize.STRING
    },
    dataInicial: {
        type: Sequelize.DATE,
        allowNull: false
    },
    dataFinal: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'contrato'
});

Contrato.belongsTo(Cliente)
Contrato.belongsTo(TipoContrato)
Contrato.belongsTo(Servico)