// Dependências
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

// Configurações
import db from "./database/db";
import { environments } from "./config/environments";

// Controllers
import usuario from "./src/controllers/UsuarioController";
import usuariohasempresa from "./src/controllers/UsuarioHasEmpresaController";
import empresa from "./src/controllers/EmpresaController";
import estado from "./src/controllers/EstadoController";
import cidade from "./src/controllers/CidadeController";
import bairro from "./src/controllers/BairroController";
import endereco from "./src/controllers/EnderecoController";
import pessoa from "./src/controllers/PessoaController";
import cliente from "./src/controllers/ClienteController";
import especie from "./src/controllers/EspecieController";
import raca from "./src/controllers/RacaController";
import animal from "./src/controllers/AnimalController";
import servico from "./src/controllers/ServicoController";
import tipocontrato from "./src/controllers/TipoContratoController";
import contrato from "./src/controllers/ContratoController";
import agendamento from "./src/controllers/AgendamentoController";
import agendamentohasanimal from "./src/controllers/AgendamentoHasAnimalController";

export class Server {
  application: any;

  initRoutes(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.application = express();
        this.application.use(cors());
        this.application.use(bodyParser.json());
        this.application.use(bodyParser.urlencoded({ extended: true }));

        db.authenticate()
          .then(() => {
            console.log("DB Conectado");
          })
          .catch(err => {
            console.log("Erro ao conectar no banco: " + err);
          });

        // Cria ou atualiza dados do Banco
        db.sync();

        // Rotas
        this.application.use("/usuario", usuario);
        this.application.use("/usuariohasempresa", usuariohasempresa);
        this.application.use("/empresa", empresa);
        this.application.use("/estado", estado);
        this.application.use("/cidade", cidade);
        this.application.use("/bairro", bairro);
        this.application.use("/endereco", endereco);
        this.application.use("/pessoa", pessoa);
        this.application.use("/cliente", cliente);
        this.application.use("/especie", especie);
        this.application.use("/raca", raca);
        this.application.use("/animal", animal);
        this.application.use("/servico", servico);
        this.application.use("/tipocontrato", tipocontrato);
        this.application.use("/contrato", contrato);
        this.application.use("/agendamento", agendamento);
        this.application.use("/agendamentohasanimal", agendamentohasanimal);

        this.application.get("/", (req, res) => {
          res.send("Endpoint inválido");
        });

        this.application = this.application.listen(environments.server.port, () => {
          resolve(this.application);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  bootstrap(): Promise<Server> {
    return this.initRoutes().then(() => this);
  }
}
