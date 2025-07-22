import { Sequelize } from "sequelize";


const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Cambia esto si tienes problemas con certificados SSL
        }
    },
});



export default sequelize;