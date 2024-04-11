const mongoose = require('mongoose');
const { Schema } = mongoose;
const { TableName, UserDB } = require('./tables.js');


const TokenSchema = new Schema({
    _id: { type: mongoose.ObjectId },
    token: { type: String, maxLength: 300 }
}, { timestamps: true });

const SelTokenModel = UserDB.model(TableName.SellerTokenTable, TokenSchema);





module.exports = { SelTokenModel };

















