import { Sequelize } from "sequelize";

const sequelize = new Sequelize("ulima-shop", "postgres", "Password123", {
  host: "ulima-shop.postgres.database.azure.com",
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
