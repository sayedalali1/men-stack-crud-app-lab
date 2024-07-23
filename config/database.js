const mongoose = require('mongoose');

console.log('DB TEST')

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});