const mongoose = require('mongoose')
var db = process.env.DATABASE

var pool = mongoose.connect(db).then((result) => {
    console.log("Database connected");
}).catch((err) => {
    console.log("error", err.message);
})


module.exports = pool