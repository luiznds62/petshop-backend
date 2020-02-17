"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Dependências
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Configurações
const db_1 = require("./database/db");
const environments_1 = require("./config/environments");
// Controllers
const UsuarioController_1 = require("./src/controllers/UsuarioController");
const UsuarioHasEmpresaController_1 = require("./src/controllers/UsuarioHasEmpresaController");
const EmpresaController_1 = require("./src/controllers/EmpresaController");
const EstadoController_1 = require("./src/controllers/EstadoController");
const CidadeController_1 = require("./src/controllers/CidadeController");
const BairroController_1 = require("./src/controllers/BairroController");
const EnderecoController_1 = require("./src/controllers/EnderecoController");
const PessoaController_1 = require("./src/controllers/PessoaController");
const ClienteController_1 = require("./src/controllers/ClienteController");
const EspecieController_1 = require("./src/controllers/EspecieController");
const RacaController_1 = require("./src/controllers/RacaController");
const AnimalController_1 = require("./src/controllers/AnimalController");
const ServicoController_1 = require("./src/controllers/ServicoController");
const TipoContratoController_1 = require("./src/controllers/TipoContratoController");
const ContratoController_1 = require("./src/controllers/ContratoController");
const AgendamentoController_1 = require("./src/controllers/AgendamentoController");
const AgendamentoHasAnimalController_1 = require("./src/controllers/AgendamentoHasAnimalController");
class Server {
    initRoutes() {
        return new Promise((resolve, reject) => {
            try {
                this.application = express();
                this.application.use(cors());
                this.application.use(bodyParser.json());
                this.application.use(bodyParser.urlencoded({ extended: true }));
                db_1.default.authenticate()
                    .then(() => {
                    console.log("DB Conectado");
                })
                    .catch(err => {
                    console.log("Erro ao conectar no banco: " + err);
                });
                // Cria ou atualiza dados do Banco
                db_1.default.sync();
                // Rotas
                this.application.use("/usuario", UsuarioController_1.default);
                this.application.use("/usuariohasempresa", UsuarioHasEmpresaController_1.default);
                this.application.use("/empresa", EmpresaController_1.default);
                this.application.use("/estado", EstadoController_1.default);
                this.application.use("/cidade", CidadeController_1.default);
                this.application.use("/bairro", BairroController_1.default);
                this.application.use("/endereco", EnderecoController_1.default);
                this.application.use("/pessoa", PessoaController_1.default);
                this.application.use("/cliente", ClienteController_1.default);
                this.application.use("/especie", EspecieController_1.default);
                this.application.use("/raca", RacaController_1.default);
                this.application.use("/animal", AnimalController_1.default);
                this.application.use("/servico", ServicoController_1.default);
                this.application.use("/tipocontrato", TipoContratoController_1.default);
                this.application.use("/contrato", ContratoController_1.default);
                this.application.use("/agendamento", AgendamentoController_1.default);
                this.application.use("/agendamentohasanimal", AgendamentoHasAnimalController_1.default);
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