import { Sequelize } from "sequelize";

const db = new Sequelize("lccc", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
