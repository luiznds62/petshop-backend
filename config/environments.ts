export const environments = {
  server: { port: process.env.PORT || 3000, version: "v1" },
  database: {
    host: process.env.DB_HOST || "belqskgiprzyv1yolgwx-postgresql.services.clever-cloud.com",
    port: parseInt(process.env.DB_PORT) || 5432,
    name: process.env.DB_NAME || "belqskgiprzyv1yolgwx",
    username: process.env.DB_USERNAME || "uxsfemrkmwaftnlqpysu",
    password: process.env.DB_PASSWORD || "mNko6oJhkWlcWUEyJASH"
  },
  security: {
    saltedRounds: process.env.SALTED_ROUNDS || 10
  }
};
