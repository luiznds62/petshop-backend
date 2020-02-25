export const environments = {
  server: { port: process.env.PORT || 3000, version: "v1" },
  database: {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 15432,
    name: process.env.DB_NAME || "petshop",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "1234"
  },
  security: {
    saltedRounds: process.env.SALTED_ROUNDS || 10
  }
};
