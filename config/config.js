require("dotenv").config();
const env = process.env;

const port = process.env.PORT
const telegram_api = env.TELEGRAM_API
const db_host = env.DB_HOST
const db_username = env.DB_USERNAME
const db_password = env.DB_PASSWORD
const db_port = env.DB_PORT
const db_name = env.DB_NAME

module.exports = {port, telegram_api, db_host, db_username, db_password, db_password, db_port, db_name};
