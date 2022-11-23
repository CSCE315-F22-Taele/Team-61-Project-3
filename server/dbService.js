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

    async getAllData() {
        try {
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

    async getNextSaleID() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT MAX(sale_id) from cabo_grill_sales;";
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



    async insertNewOrder(sale_id, date, entree_type, protein, chips_and_salsa, chips_and_queso, chips_and_guac, drink, cost) {
        try {
            const response = await new Promise((resolve, reject) => {
                var todaysDate = new Date();
                var dd = String(todaysDate.getDate()).padStart(2, '0');
                var mm = String(todaysDate.getMonth() + 1).padStart(2, '0');
                var yyyy = todaysDate.getFullYear();
                todaysDate = yyyy + '-' + mm + '-' + dd;
                const query = `INSERT INTO cabo_grill_sales VALUES (${sale_id}, '${todaysDate}', '${entree_type}', '${protein}', ${chips_and_salsa}, ${chips_and_queso}, ${chips_and_guac}, ${drink}, ${cost});`;
                connection.query(query, (err, result) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    else {
                        resolve(result);
                    }
                });
            });
            return {
                sale_id : sale_id,
                date : date,
                entree_type : entree_type,
                protein : protein,
                chips_and_salsa : chips_and_salsa,
                chips_and_queso : chips_and_queso,
                chips_and_guac : chips_and_guac,
                drink : drink,
                cost : cost
            };
        } 
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;