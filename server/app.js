const { Client } = require('pg');

const client = new Client({
    host: "csce-315-db.engr.tamu.edu",
    port: 5432,
    user: "csce331_905_justin",
    password: "justin",
    database: "csce331_905_61",
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
})
client.connect();

//query database function
client.query('select * from cabo_grill', (err, result) => {
    if (!err) {
        console.log(result.rows);
    }
    else {
        console.log(err.message);
    }
    client.end();
}) 

//update database function

// add to database function

//these will most likely all need to be duplicated for the sales database, and inventory database

