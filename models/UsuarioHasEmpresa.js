const Model = Sequelize.Model;
class UsuarioHasEmpresa extends Model { }
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
    sequelize,
    modelName: 'usuariohasempresa'
});