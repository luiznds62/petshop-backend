"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependências
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const path = require("path");
const fs = require("fs");
const shelljs = require("shelljs");
const fileupload = require("express-fileupload");
// Configurações
const db_1 = require("./database/db");
const environments_1 = require("./config/environments");
class Server {
    loadAssets() {
        let folder = path.basename(__dirname).substr(0, __dirname.length - 4).concat('src/assets/.');
        folder = "./".concat(folder.substr(4, folder.length));
        shelljs.cp('-R', folder, './dist/src/assets');
    }
    loadDb() {
        return new Promise((resolve, reject) => {
            db_1.default.authenticate()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                // Cria ou atualiza dados do Banco
                yield db_1.default.sync();
                console.log("DB Conectado");
                resolve();
            }))
                .catch(err => {
                console.log("Erro ao conectar no banco: " + err);
                reject();
            });
        });
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
                this.application.use(fileupload());
                this.loadRoutes();
                this.loadAssets();
                this.loadDb();
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