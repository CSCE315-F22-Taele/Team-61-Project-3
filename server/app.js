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

app.get('/getAllProteinInventory', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllProteinInventory();
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

app.listen(process.env.PORT || 5555, () => console.log('app is running'));