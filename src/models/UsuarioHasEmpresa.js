import Sequelize from 'sequelize'
import db from '../../database/db'
import Usuario from './Usuario'
import Empresa from './Empresa'

class UsuarioHasEmpresa extends Sequelize.Model { }
UsuarioHasEmpresa.init({
    idUsuario: {
        type: Sequelize.BIGINT,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    },
    idEmpresa: {
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

export default UsuarioHasEmpresa