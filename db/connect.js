import Sequelize from 'sequelize'
import logger from '../core/logger/app-logger'
import config from '../core/config/config.dev'

const connectToDb = async () => {
    let dbUser = config.dbUser
    let dbPassword = config.dbPassword
    let dbName = config.dbName
    try {
        let sequelize = new Sequelize(dbName, dbUser, dbPassword, {
            host: 'localhost',
            dialect: 'postgres'
        }, {
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        })

        sequelize
            .authenticate()
            .then(() => {
                console.log('Conexão estabelecida com sucesso!');
            })
            .catch(err => {
                console.error('Erro ao conectar no banco: ', err);
            });

        // Cria automáticamente sincronização entre banco e aplicação
        sequelize.sync()
    }
    catch (err) {
        logger.error('Falha ao tentar conectar no banco: ' + err)
    }
}

export default connectToDb;