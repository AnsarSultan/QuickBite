import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: "localhost",     // change if your DB is remote
  dialect: "postgres",
  logging: false,        // set true to see SQL queries
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

connectDB();

export default sequelize;
