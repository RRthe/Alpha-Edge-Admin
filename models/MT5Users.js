const mongoose = require('mongoose');

const mt5UserSchema = new mongoose.Schema({
    group: { type: String, required: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    country: string,
    city: string,
    state: string,  
    comment: string,
    id: string,
    status: string,
    leverage: 0,
    balance: 0,
    mt5AccountNumber: Number,
    // other MT5 specific fields
    // ...
});

module.exports = mongoose.model('MT5User', mt5UserSchema);
