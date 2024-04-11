const mongoose = require('mongoose');
const { Schema } = mongoose;
const { TableName, UserDB } = require('../utils/tables');


const SelTokenSchema = new Schema({
    _id: { type: mongoose.ObjectId },
    token: { type: String, maxLength: 300 },
    profileStatus: { type: String, maxLength: 15, default: 'NotCreate' },
}, { timestamps: true });


const SelTokenModel = UserDB.model(TableName.SellerTokenTable, SelTokenSchema);





module.exports = { SelTokenModel };