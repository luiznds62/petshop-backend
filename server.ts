// Dependências
import * as express from "express"
import * as bodyParser from "body-parser"
import * as cors from "cors"

// Configurações
import db from './database/db'

// Controllers
import usuario from './src/controllers/UsuarioController'
import usuariohasempresa from './src/controllers/UsuarioHasEmpresaController'
import empresa from './src/controllers/EmpresaController'
import estado from './src/controllers/EstadoController'
import cidade from './src/controllers/CidadeController'
// import bairro from './src/controllers/BairroController'
// import endereco from './src/controllers/EnderecoController'
import pessoa from './src/controllers/PessoaController'
// import cliente from './src/controllers/ClienteController'
// import especie from './src/controllers/EspecieController'
// import raca from './src/controllers/RacaController'
// import animal from './src/controllers/AnimalController'
// import servico from './src/controllers/ServicoController'
// import tipocontrato from './src/controllers/TipoContratoController'
// import contrato from './src/controllers/ContratoController'
// import agendamento from './src/controllers/AgendamentoController'
// import agendamentohasanimal from './src/controllers/AgendamentoHasAnimalController'

let port = process.env.PORT || 3000
let app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

db.authenticate().then(() => {
    console.log("DB Conectado")
}).catch(err => {
    console.log("Erro ao conectar no banco: " + err)
})

// Cria ou atualiza dados do Banco
db.sync()

// Rotas
app.use('/usuario', usuario)
app.use('/usuariohasempresa', usuariohasempresa)
app.use('/empresa', empresa)
app.use('/estado', estado)
app.use('/cidade', cidade)
// app.use('/bairro', bairro)
// app.use('/endereco', endereco)
app.use('/pessoa', pessoa)
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
    res.send("Endpoint inválido")
})

app.listen(port, () => {
    console.log("Servidor rodando na porta - ", port)
})