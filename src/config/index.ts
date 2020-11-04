export const environment = process.env.NODE_ENV || "development";
export const PORT = process.env.PORT || 3000;

export const DB_CONNECTION = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_DATABASE,
};
