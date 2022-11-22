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
    async getEntreeOptions() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name FROM cabo_grill WHERE type = 'entree';";
                connection.query(query, (err, results) => {
                    if (err)
                        reject(new Error(err.message));
                    else
                        resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async getProteinOptions() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name FROM cabo_grill WHERE type = 'protein';";
                connection.query(query, (err, results) => {
                    if (err)
                        reject(new Error(err.message));
                    else
                        resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    // query function that displays all items in inventory that are protein
    async getAllProteinOptions() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill WHERE type = 'protein';";
                connection.query(query, (err, results) => {
                    if (err)
                        reject(new Error(err.message));
                    else
                        resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async getSideOptions() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name FROM cabo_grill WHERE type = 'side';";
                connection.query(query, (err, results) => {
                    if (err)
                        reject(new Error(err.message));
                    else
                        resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async getAllSideOptions() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill WHERE type = 'side';";
                connection.query(query, (err, results) => {
                    if (err)
                        reject(new Error(err.message));
                    else
                        resolve(results);
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    // query to retrieve all items from inventory
    async getAllInventory() {
        try {
            // handle the query
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill ORDER BY id ASC;";

                connection.query(query, (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    else {
                        resolve(results);
                    }
                });
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    async getAllData() {
        try {
            // handle the query
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill_sales ORDER BY sale_id DESC;";

                connection.query(query, (err, results) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    else {
                        resolve(results);
                    }
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