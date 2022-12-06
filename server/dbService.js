/**
 * This file is used mainly for connecting with our database
 * @author Justin Singletary
 */


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

    async getEntreeQuantity() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name, quantity FROM cabo_grill WHERE type='entree';";
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

    async getProteinQuantity() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name, quantity FROM cabo_grill WHERE type='protein';";
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

    async getSideQuantity() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name, quantity FROM cabo_grill WHERE type='side';";
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

    async getToppingQuantity() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT item_name, quantity FROM cabo_grill WHERE type='topping';";
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

    async insertNewItem(item_id, item_name, item_type, quantity, cost, supply) {
        try {
            const response = await new Promise((resolve, reject) => {
                console.log(item_id, item_name, item_type, quantity, cost, supply)
                const query = `INSERT INTO cabo_grill VALUES (${item_id}, '${item_name}', '${item_type}', ${quantity}, ${cost}, ${supply});`;
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
                item_id : item_id,
                item_name : item_name,
                item_type : item_type,
                quantity : quantity,
                cost : cost,
                supply : supply
            };
        } 
        catch (error) {
            console.log(error);
        }
    }

    async updateQuantity(item, quantity) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `UPDATE cabo_grill SET quantity = ${quantity} WHERE item_name = '${item}';`;
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
                item : item,
                quantity : quantity
            };
        }
        catch (error) {
            console.log(error);
        }
    }

    async getOrders(entree_type, protein_type, chips_and_salsa, chips_and_queso, chips_and_guac, drink, sideBtn, startDate, endDate) {
        try {
            const response = await new Promise((resolve, reject) => {
                // console.log(entree_type);
                // console.log(protein_type);
                // console.log(sideBtn);
                console.log((entree_type == 'none' || protein_type == 'none') && sideBtn == 'all');
                let query = "";
                // none query for all side btn
                if((entree_type == 'none' || protein_type == 'none') && sideBtn == 'all') {
                    query = `SELECT * FROM cabo_grill_sales WHERE (entree_type IS NULL AND sale_id > 1 AND (date BETWEEN '${startDate}' AND '${endDate}')) ORDER BY sale_id DESC;`
                }
                // none query for specific side btn
                else if((entree_type == 'none' || protein_type == 'none') && (sideBtn != 'none' && sideBtn != 'all')) {
                    query = `SELECT * FROM cabo_grill_sales WHERE (entree_type IS NULL AND ${sideBtn} >= '1' AND sale_id > 1 AND (date BETWEEN '${startDate}' AND '${endDate}')) ORDER BY sale_id DESC;`
                }
                // specific entree, specific protien, all sides
                else if(entree_type != 'all' && entree_type != 'none' && protein_type != 'all' && protein_type != 'none' && sideBtn == 'all') {
                    query = `SELECT * FROM cabo_grill_sales WHERE (entree_type = '${entree_type}' AND protein = '${protein_type}' AND sale_id > 1 AND (date BETWEEN '${startDate}' AND '${endDate}')) ORDER BY sale_id DESC;`;
                } 
                // specific entree, specific protien, specific sides
                else if(entree_type != 'all' && entree_type != 'none' && protein_type != 'all' && protein_type != 'none' && (sideBtn != 'all' || sideBtn != 'none')) {
                    query = `SELECT * FROM cabo_grill_sales WHERE (entree_type = '${entree_type}' AND protein = '${protein_type}' 
                    AND ${sideBtn} = '1' AND sale_id > 1 AND (date BETWEEN '${startDate}' AND '${endDate}')) ORDER BY sale_id DESC;`;
                } 
                // all entrees, specific protein, either all
                else if(entree_type == 'all' && protein_type != 'all' && protein_type != 'none' && sideBtn == 'all') {
                    query = `SELECT * FROM cabo_grill_sales WHERE (protein = '${protein_type}' AND sale_id > 1 AND (date BETWEEN '${startDate}' AND '${endDate}')) ORDER BY sale_id DESC;`;
                }
                // all entrees, specific protein, specific sides
                else if(entree_type == 'all' && protein_type != 'all' && protein_type != 'none' && (sideBtn != 'all' || sideBtn != 'none')) {
                    query = `SELECT * FROM cabo_grill_sales WHERE (protein = '${protein_type}' 
                    AND ${sideBtn} >= '1' AND sale_id > 1 AND (date BETWEEN '${startDate}' AND '${endDate}')) ORDER BY sale_id DESC;`;
                }
                // all entrees, all protein, all sides
                else if(entree_type == 'all' && protein_type == 'all' && protein_type != 'none' && sideBtn == 'all') {
                    query = `SELECT * FROM cabo_grill_sales WHERE  (sale_id > 1 AND (date BETWEEN '${startDate}' AND '${endDate}')) ORDER BY sale_id DESC;`;
                }
                // all entree, all protein, specific sides
                else if(entree_type == 'all' && protein_type == 'all' && protein_type != 'none' && (sideBtn != 'all' || sideBtn != 'none')) {
                    query = `SELECT * FROM cabo_grill_sales WHERE (${sideBtn} >= '1' AND sale_id > 1 AND (date BETWEEN '${startDate}' AND '${endDate}')) ORDER BY sale_id DESC;`;
                }
                console.log(query);
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
}

module.exports = DbService;