import path from "path";
import { Sequelize } from "sequelize";

const __dirname = path.resolve();

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "data", "database.sqlite"),
    logging: false,
});



export default sequelize;