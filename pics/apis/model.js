const mongoose = require('mongoose');
const { Schema } = mongoose;
const { TableName, UserDB } = require('../utils/tables');

const PicSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: TableName.SellerAuthTable, required: true },
    picurl: {
        type: String, required: true, minlength: [5, "Pic URL must be at least 5 characters long"],
        maxlength: [512, "Pic URL cannot exceed 512 characters"]
    },
    verify: { type: Boolean, required: true, default: false },

}, { timestamps: true });


const PicModel = UserDB.model(TableName.SellerPicTable, PicSchema);

module.exports = { PicModel }
