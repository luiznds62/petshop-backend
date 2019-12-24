// Dependências
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger'
import morgan from 'morgan'

// Configurações
import connectToDb from './db/connect'

// Controllers
import usuario from './controllers/UsuarioController'

let port = process.env.PORT || 3000;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));
connectToDb();

// Rotas
app.use('/usuario', usuario);

app.get('/', (req, res) => {
    res.send("Endpoint inválido");
});

app.listen(port, () => {
    logger.info("Servidor rodando na porta - ", port);
});