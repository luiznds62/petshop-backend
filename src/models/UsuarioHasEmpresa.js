import Sequelize from 'sequelize'
import db from '../../database/db'

class UsuarioHasEmpresa extends Sequelize.Model { }
UsuarioHasEmpresa.init({
    usuario: {
        type: Sequelize.BIGINT,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    },
    empresa: {
        type: Sequelize.BIGINT,
        references: {
            model: Empresa,
            key: 'id'
        },
        allowNull: false
    },
    perfil: {
        type: Sequelize.ENUM,
        values: ['administrador', 'comum'],
        allowNull: false
    },
}, {
    sequelize: db,
    modelName: 'usuariohasempresa'
});