const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    mongo: {
        connectionString: process.env.DB_CONNECTION_STRING
    }
}