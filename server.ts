// Dependências
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as fs from "fs";

// Configurações
import db from "./database/db";
import { environments } from "./config/environments";

export class Server {
  application: any;

  loadDb() {
    db.authenticate()
      .then(() => {
        console.log("DB Conectado");
      })
      .catch(err => {
        console.log("Erro ao conectar no banco: " + err);
      });

    // Cria ou atualiza dados do Banco
    db.sync();
  }

  loadRoutes() {
    const ctlDir = "/src/controllers/";
    let files = fs.readdirSync(__dirname + ctlDir);
    files
      .filter(file => !file.endsWith(".map"))
      .forEach(file => {
        let entity = `/api/${environments.server.version}/`.concat(
          file.replace(/Controller.js/, "s").toLowerCase()
        );
        this.application.use(entity, require(`./src/controllers/${file}`));
      });
  }

  initRoutes(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = express();
        this.application.use(cors());
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.loadDb();
        this.loadRoutes();

        this.application.get("/", (req, res) => {
          res.send("Endpoint inválido");
        });

        this.application = this.application.listen(
          environments.server.port,
          () => {
            resolve(this.application);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(): Promise<Server> {
    return this.initRoutes().then(() => this);
  }
}
