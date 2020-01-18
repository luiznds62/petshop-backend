import Sequelize from 'sequelize'
import db from '../../database/db'
import Usuario from './Usuario'
import Empresa from './Empresa'

class UsuarioHasEmpresa extends Sequelize.Model { }
UsuarioHasEmpresa.init({
    usuarioId: {
        type: Sequelize.BIGINT,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    },
    empresaId: {
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
    habilitado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize: db,
    modelName: 'usuariohasempresa'
});

UsuarioHasEmpresa.belongsTo(Usuario)
UsuarioHasEmpresa.belongsTo(Empresa)

export default UsuarioHasEmpresa