"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require("sequelize");
const db_1 = require("../../database/db");
const Usuario_1 = require("./Usuario");
const Empresa_1 = require("./Empresa");
class UsuarioHasEmpresa extends Sequelize.Model {
}
exports.UsuarioHasEmpresa = UsuarioHasEmpresa;
UsuarioHasEmpresa.init({
    usuarioId: {
        type: Sequelize.BIGINT,
        references: {
            model: Usuario_1.Usuario,
            key: 'id'
        },
        allowNull: false
    },
    empresaId: {
        type: Sequelize.BIGINT,
        references: {
            model: Empresa_1.Empresa,
            key: 'id'
        },
        allowNull: false
    },
    perfil: {
        type: Sequelize.ENUM,
        values: ['administrador', 'comum'],
        allowNull: false
    },
    habilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: db_1.default,
    modelName: 'usuariohasempresa'
});
UsuarioHasEmpresa.belongsTo(Usuario_1.Usuario);
UsuarioHasEmpresa.belongsTo(Empresa_1.Empresa);
