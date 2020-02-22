"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Dependências
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const fs = require("fs");
// Configurações
const db_1 = require("./database/db");
const environments_1 = require("./config/environments");
class Server {
    loadDb() {
        db_1.default.authenticate()
            .then(() => {
            console.log("DB Conectado");
        })
            .catch(err => {
            console.log("Erro ao conectar no banco: " + err);
        });
        // Cria ou atualiza dados do Banco
        db_1.default.sync();
    }
    loadRoutes() {
        const ctlDir = "/src/controllers/";
        let files = fs.readdirSync(__dirname + ctlDir);
        files
            .filter(file => !file.endsWith(".map"))
            .forEach(file => {
            let entity = `/api/${environments_1.environments.server.version}/`.concat(file.replace(/Controller.js/, "s").toLowerCase());
            this.application.use(entity, require(`./src/controllers/${file}`));
        });
    }
    initRoutes() {
        return new Promise((resolve, reject) => {
            try {
                this.application = express();
                this.application.use(cors());
                this.application.use(helmet());
                this.application.use(hpp());
                this.application.use(bodyParser.json());
                this.application.use(bodyParser.urlencoded({ extended: true }));
                this.loadDb();
                this.loadRoutes();
                this.application.get("/", (req, res) => {
                    res.send("Endpoint inválido");
                });
                this.application = this.application.listen(environments_1.environments.server.port, () => {
                    resolve(this.application);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap() {
        return this.initRoutes().then(() => this);
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map