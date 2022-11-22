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

app.get('/getAllProteinOptions', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllProteinOptions();
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

app.get('/getAllSideOptions', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllSideOptions();
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

app.get('/getAllToppingOptions', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getAllToppingOptions();
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

app.listen(process.env.PORT || 5555, () => console.log('app is running'));