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
// import bairro from './src/controllers/BairroController'
// import endereco from './src/controllers/EnderecoController'
const PessoaController_1 = require("./src/controllers/PessoaController");
// import cliente from './src/controllers/ClienteController'
// import especie from './src/controllers/EspecieController'
// import raca from './src/controllers/RacaController'
// import animal from './src/controllers/AnimalController'
// import servico from './src/controllers/ServicoController'
// import tipocontrato from './src/controllers/TipoContratoController'
// import contrato from './src/controllers/ContratoController'
// import agendamento from './src/controllers/AgendamentoController'
// import agendamentohasanimal from './src/controllers/AgendamentoHasAnimalController'
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
// app.use('/bairro', bairro)
// app.use('/endereco', endereco)
app.use('/pessoa', PessoaController_1.default);
// app.use('/cliente', cliente)
// app.use('/especie', especie)
// app.use('/raca', raca)
// app.use('/animal', animal)
// app.use('/servico', servico)
// app.use('/tipocontrato', tipocontrato)
// app.use('/contrato', contrato)
// app.use('/agendamento', agendamento)
// app.use('/agendamentohasanimal', agendamentohasanimal)
app.get('/', (req, res) => {
    res.send("Endpoint inválido");
});
app.listen(port, () => {
    console.log("Servidor rodando na porta - ", port);
});
