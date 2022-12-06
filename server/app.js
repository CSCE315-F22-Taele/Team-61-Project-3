/**
 * This file is used mainly for accessing different elements from our backend that we need. 
 * It consists of lots of get functions as well as some update functions
 * @author Justin Singletary, Brandon Moon 
 */

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { request, response } = require('express');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

/**
 * This function accesses the entree options for our table 
 * @author Justin Singletary
 * @access Entree options
 */
app.get('/getEntreeOptions', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getEntreeOptions();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getProteinOptions', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getProteinOptions();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getSideOptions', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getSideOptions();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getToppingOptions', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getToppingOptions();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getAllProteinInventory', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllProteinInventory();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getAllSideInventory', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllSideInventory();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getAllInventory', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllInventory();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getAllToppingInventory', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllToppingInventory();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getAllTortillaInventory', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllTortillaInventory();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getAllMiscInventory', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllMiscInventory();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

//read data
app.get('/getAll', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getAllOrders', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllOrders();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getBowlOrders', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getBowlOrders();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getNoneOrders', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getNoneOrders();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getBurritoOrders', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getBurritoOrders();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getTacoOrders', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getTacoOrders();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getNextSaleID', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getNextSaleID();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getProteinPrices', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getProteinPrices();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getSidePrices', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getSidePrices();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getEntreeQuantity', (request, response) => {   
    const db = dbService.getDbServiceInstance();
    const result = db.getEntreeQuantity();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getProteinQuantity', (request, response) => {   
    const db = dbService.getDbServiceInstance();
    const result = db.getProteinQuantity();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getSideQuantity', (request, response) => {   
    const db = dbService.getDbServiceInstance();
    const result = db.getSideQuantity();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getToppingQuantity', (request, response) => {   
    const db = dbService.getDbServiceInstance();
    const result = db.getToppingQuantity();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.post('/insert', (request, response) => {
    const { sale_id } = request.body;
    const { date } = request.body;
    const { entree_type } = request.body;
    const { protein } = request.body;
    const { chips_and_salsa } = request.body;
    const { chips_and_queso } = request.body;
    const { chips_and_guac } = request.body;
    const { drink } = request.body;
    const { cost } = request.body;


    const db = dbService.getDbServiceInstance();
    const result = db.insertNewOrder(sale_id, date, entree_type, protein, chips_and_salsa, chips_and_queso, chips_and_guac, drink, cost);

    result
    .then(data => response.json({ data : data }));
}) 

app.post('/updateQuantities', (request, response) => {
    const { protein } = request.body;
    const { proteinQuantity } = request.body;
    const { chips_and_salsaQuantity } = request.body;
    const { chips_and_quesoQuantity } = request.body;
    const { chips_and_guacQuantity } = request.body;
    const { drinkQuantity } = request.body;

    const db = dbService.getDbServiceInstance();
    const result = db.updateQuantities(protein, proteinQuantity, chips_and_salsaQuantity, chips_and_quesoQuantity, chips_and_guacQuantity, drinkQuantity);

    result
    .then(data => response.json({ data : data }));
}) 

app.post('/updateQuantity', (request, response) => {
    const { item } = request.body;
    const { quantity } = request.body;

    const db = dbService.getDbServiceInstance();
    const result = db.updateQuantity(item, quantity);

    result
    .then(data => response.json({ data : data }));
}) 
app.get('/getOrders/:entreeType/:proteinType/:chipsAndSalsa/:chipsAndQueso/:chipsAndGuac/:drinkOption/:sideButtonPressed/:startDate/:endDate', (request, response) => {
    const entree_type  = request.params.entreeType;
    const protein_type = request.params.proteinType; 
    const chips_and_salsa = request.params.chipsAndSalsa;
    const  chips_and_queso = request.params.chipsAndQueso;
    const  chips_and_guac = request.params.chipsAndGuac;
    const  drink = request.params.drinkOption;
    const sideBtn = request.params.sideButtonPressed;
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    const db = dbService.getDbServiceInstance()
    const result = db.getOrders(entree_type, protein_type, chips_and_salsa, chips_and_queso, chips_and_guac, drink, sideBtn, startDate, endDate);

    result 
    .then(data => response.json({ data : data }))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT || 5555, () => console.log('app is running'));