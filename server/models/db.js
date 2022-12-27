const mongoose = require('mongoose');

console.log("Spicy Noodles", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { heartbeatFrequencyMS: 2000 },     
    (err) =>{
    if(!err){
        console.log("MongoDB connection succeeded.");
    }
    else{
        console.log('Pakhi paka ' + JSON.stringify(err, undefined, 2));
    }
});

require('./user.model');
require('./exam.model');