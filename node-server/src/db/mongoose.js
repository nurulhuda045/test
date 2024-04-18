const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/my-test-DB").then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("Failed to connect to the database!", err)
})