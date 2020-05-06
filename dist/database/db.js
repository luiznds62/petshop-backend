"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const environments_1 = require("../config/environments");
let db = new sequelize_1.Sequelize(environments_1.environments.database.name, environments_1.environments.database.username, environments_1.environments.database.password, {
    host: environments_1.environments.database.host,
    port: environments_1.environments.database.port,
    dialect: "postgres",
    dialectOptions: {
        dateStrings: true
    },
    logging: false
});
exports.default = db;
//# sourceMappingURL=db.js.map