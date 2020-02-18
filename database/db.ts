import { Sequelize } from "sequelize";
import { environments } from "../config/environments";

export default new Sequelize(
  environments.database.name,
  environments.database.username,
  environments.database.password,
  {
    host: environments.database.host,
    port: environments.database.port,
    dialect: "postgres",
    dialectOptions: {
      dateStrings: true
    },
    logging: false
  }
);
