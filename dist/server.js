"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Dependências
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Configurações
const db_1 = require("./database/db");
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
let port = process.env.PORT || 3000;
let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
db_1.default.authenticate().then(() => {
    console.log("DB Conectado");
}).catch(err => {
    console.log("Erro ao conectar no banco: " + err);
});
// Cria ou atualiza dados do Banco
db_1.default.sync();
// Rotas
app.use('/usuario', UsuarioController_1.default);
app.use('/usuariohasempresa', UsuarioHasEmpresaController_1.default);
app.use('/empresa', EmpresaController_1.default);
app.use('/estado', EstadoController_1.default);
app.use('/cidade', CidadeController_1.default);
app.use('/bairro', BairroController_1.default);
app.use('/endereco', EnderecoController_1.default);
app.use('/pessoa', PessoaController_1.default);
app.use('/cliente', ClienteController_1.default);
app.use('/especie', EspecieController_1.default);
app.use('/raca', RacaController_1.default);
app.use('/animal', AnimalController_1.default);
app.use('/servico', ServicoController_1.default);
app.use('/tipocontrato', TipoContratoController_1.default);
app.use('/contrato', ContratoController_1.default);
app.use('/agendamento', AgendamentoController_1.default);
app.use('/agendamentohasanimal', AgendamentoHasAnimalController_1.default);
app.get('/', (req, res) => {
    res.send("Endpoint inválido");
});
app.listen(port, () => {
    console.log("Servidor rodando na porta - ", port);
});
