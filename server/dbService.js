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

    async getToppingOptions() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name FROM cabo_grill WHERE type = 'topping';";
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
    async getAllProteinInventory() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill WHERE (type = 'protein' AND id > 0) ORDER BY id ASC;";
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

    async getAllSideInventory() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill WHERE (type = 'side' AND id > 0) ORDER BY id ASC;";
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
                const query = "SELECT * FROM cabo_grill WHERE id > 0 ORDER BY id ASC;";

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

    async getAllToppingInventory() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill WHERE (type = 'topping' and id > 0) ORDER BY id ASC;";
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

    async getAllTortillaInventory() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill WHERE (type = 'tortilla' AND id > 0) ORDER BY id ASC;";
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

    async getAllMiscInventory() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill WHERE (type = 'misc' AND id > 0) ORDER BY id ASC;";
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

    async getAllOrders() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "select * from cabo_grill_sales WHERE sale_id > 1 ORDER BY sale_id DESC;";
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

    async getBowlOrders() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill_sales WHERE (entree_type = 'bowl' AND sale_id > 1) ORDER BY sale_id DESC;";
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

    async getNoneOrders() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill_sales WHERE (entree_type IS NULL AND sale_id > 1) ORDER BY sale_id DESC;";
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

    async getBurritoOrders() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill_sales WHERE (entree_type = 'burrito' AND sale_id > 1) ORDER BY sale_id DESC;";
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

    async getTacoOrders() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM cabo_grill_sales WHERE (entree_type = 'tacos' AND sale_id > 1) ORDER BY sale_id DESC;";
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

    async getProteinPrices() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name, sale_cost FROM cabo_grill where type='protein';";
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

    async getSidePrices() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name, sale_cost FROM cabo_grill where type='side';";
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

    async getOrders(entree_type, protein_type, chips_and_salsa, chips_and_queso, chips_and_guac, drink) {
        try {
            const response = await new Promise((resolve, reject) => {
                if (entree_type == 'none' && protein_type == 'none') {
                    const query = `SELECT * FROM cabo_grill_sales WHERE (entree_type IS NULL AND chips_and_salsa = '${chips_and_salsa}' AND chips_and_queso = '${chips_and_queso}' AND chips_and_guac = '${chips_and_guac}' AND drink = '${drink}'
                    AND sale_id > 1) ORDER BY sale_id DESC;`;
                } 
                else {
                    const query = `SELECT * FROM cabo_grill_sales WHERE (entree_type IN (${entree_type.join(',')} AND protein IN (${protein_type.join(',')}) AND chips_and_salsa = '${chips_and_salsa}' AND chips_and_queso = '${chips_and_queso}' AND chips_and_guac = '${chips_and_guac}' AND drink = '${drink}'
                    AND sale_id > 1) ORDER BY sale_id DESC;`;
                    connection.query(query, (err, results) => {
                        if (err)
                            reject(new Error(err.message));
                        else
                            resolve(results);
                    });
                }
            });
            return response;
        } 
        catch (error) {
            console.log(error);
        }
    }

    /*
    // No entree or protein but all or no sides
    if ((entree_type == "none" || protein_type == "none") && (sideBtnPressed == "All" || sideBtnPressed == "none"))
        const query = SELECT * FROM cabo_grill_sales WHERE (entree_type IS NULL AND chips_and_salsa = '${chips_and_salsa}' AND chips_and_queso = '${chips_and_queso}' AND chips_and_guac = '${chips_and_guac}' AND drink = '${drink} AND sale_id > 1) ORDER BY sale_id DESC;
    // No entree or protein but specific side
    else if ((entree_type == "none" || protein_type == "none") && (sideBtnPressed == "chips_and_salsa"))
        const query = SELECT * FROM cabo_grill_sales WHERE (entree_type IS NULL AND ${side_choice} AND sale_id > 1) ORDER BY sale_id DESC;


    */


}

module.exports = DbService;