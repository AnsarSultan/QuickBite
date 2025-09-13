import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: "localhost",     
  dialect: "postgres",
  logging: false,        
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected successfully");
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

connectDB();

export default sequelize;
