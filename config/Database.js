import { Sequelize } from "sequelize";

const db = new Sequelize('userarsip_db', 'root', '',{
    host: "localhost",
    dialect: "mysql"
});

export default db;