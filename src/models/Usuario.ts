import * as Sequelize from "sequelize";
import * as bcrypt from "bcrypt";
import db from "../../database/db";
import { environments } from "../../config/environments";

export class Usuario extends Sequelize.Model {}
Usuario.init(
  {
    login: {
      type: Sequelize.STRING,
      allowNull: false
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tokenResetarSenha: {
      type: Sequelize.STRING,
      defaultValue: ""
    },
    expiracaoToken: {
      type: Sequelize.DATE,
      defaultValue: new Date(1800)
    }
  },
  {
    sequelize: db,
    modelName: "usuario"
  }
);

Usuario.beforeCreate(async (usuario: any, options) => {
  const hashedPassword = await bcrypt.hash(usuario.senha,environments.security.saltedRounds)
  usuario.senha = hashedPassword;
});
