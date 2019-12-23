import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger'
import morgan from 'morgan'
import config from './core/config/config.dev'
import materias from './controllers/materia.route'
import connectToDb from './db/connect'

let port = process.env.PORT || 3000;
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

connectToDb();

let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

app.use('/materia', materias);

app.get('/', (req, res) => {
    res.send("Endpoint inválido");
});

app.listen(port, () => {
    logger.info("Servidor rodando na porta - ", port);
});