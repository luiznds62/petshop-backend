import Sequelize from 'sequelize'

export default new Sequelize('petshop', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
    dialectOptions: {
        dateStrings: true,
    },
});