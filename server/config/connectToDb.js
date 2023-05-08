// load env variables
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config();
}

const mongoose = require("mongoose");

async function connectToDb () {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Successfully Connected");
    } catch(err) {
        console.log(err);
    }
    
}

module.exports = connectToDb;