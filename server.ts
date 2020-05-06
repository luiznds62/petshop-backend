// Dependências
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as helmet from "helmet";
import * as hpp from "hpp";
import * as path from "path";
import * as fs from "fs";
import * as shelljs from "shelljs";
import * as fileupload from "express-fileupload";

// Configurações
import db from "./database/db";
import { environments } from "./config/environments";

export class Server {
  application: any;

  loadAssets() {
    let folder = path.basename(__dirname).substr(0, __dirname.length - 4).concat('src/assets/.');
    folder = "./".concat(folder.substr(4, folder.length));
    shelljs.cp('-R', folder, './dist/src/assets');
  }

  loadDb() {
    return new Promise((resolve, reject) => {
      db.authenticate()
        .then(async () => {
          // Cria ou atualiza dados do Banco
          await db.sync();

          console.log("DB Conectado");
          resolve();
        })
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
        this.application.use(helmet());
        this.application.use(hpp());
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.application.use(fileupload())
        this.loadRoutes();
        this.loadAssets();
        this.loadDb();

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
