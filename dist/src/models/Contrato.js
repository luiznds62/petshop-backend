"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Servico_1 = require("./Servico");
const TipoContrato_1 = require("./TipoContrato");
const Cliente_1 = require("./Cliente");
class Contrato extends Sequelize.Model {
}
exports.Contrato = Contrato;
Contrato.init({
    clienteId: {
        type: Sequelize.BIGINT,
        references: {
            model: Cliente_1.Cliente,
            key: 'id'
        },
        allowNull: false
    },
    tipoContratoId: {
        type: Sequelize.BIGINT,
        references: {
            model: TipoContrato_1.TipoContrato,
            key: 'id'
        },
        allowNull: false
    },
    servicoId: {
        type: Sequelize.BIGINT,
        references: {
            model: Servico_1.Servico,
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
    sequelize: db_1.default,
    modelName: 'contrato'
});
Contrato.belongsTo(Cliente_1.Cliente);
Contrato.belongsTo(TipoContrato_1.TipoContrato);
Contrato.belongsTo(Servico_1.Servico);
//# sourceMappingURL=Contrato.js.map