const mongoose = require("mongoose");


const connectToDB = () => {
    const dbURL = process.env.DB_URL
    mongoose.connect(dbURL).then(() => {
        console.log(":::::::connected to db successfully::::::");
    }).catch(err => {
        console.log("::::::::Error connection to db::::::\n" + err);
    })
}

module.exports = connectToDB