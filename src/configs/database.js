import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ulima-shop", "postgres", "Password123", {
  host: "servidor-de-abigail.postgres.database.azure.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
