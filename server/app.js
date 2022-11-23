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

app.get('/getSideOptions', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getSideOptions();
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

app.get('/getNextSaleID', (request, response) => {    
    const db = dbService.getDbServiceInstance();
    const result = db.getNextSaleID();
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

app.listen(process.env.PORT || 5555, () => console.log('app is running'));