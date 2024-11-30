import { Sequelize } from "sequelize";

const db = new Sequelize("quiz", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
