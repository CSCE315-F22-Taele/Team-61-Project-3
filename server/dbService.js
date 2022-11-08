const { Client } = require('pg');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = new Client({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    ssl: {
       require: true,
       rejectUnauthorized: false
    }
});

connection.connect((err) => {
    if (err) {
        console.log("ERROR: " + err.message);

    }
    console.log('db connected');
})


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill_sales;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;