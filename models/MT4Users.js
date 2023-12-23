const mongoose = require('mongoose');

const mt4UserSchema = new mongoose.Schema({
    group: { type: String, required: true},
    name: { type: String, required: true },
    email: string,
    country: string,
    city: string,
    state: string,  
    comment: string,
    id: string,
    status: string,
    leverage: 0,
    balance: 0,
    
    
});

module.exports = mongoose.model('MT4User', mt4UserSchema);
