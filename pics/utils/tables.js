// const mongoose = require('mongoose');
const { DbConnection } = require('./db.js');

class TableName {


    //. seller 
    static SellerTokenTable = 'token';
    static SellerMobileTable = 'mobile_otp';
    static SellerAuthTable = 'auth';
    static SellerProfileTable = 'profile';
    static SellerProfileDetailTable = 'profile_detail';
    static SellerTranscationTable = 'transcation';
    static SellerWalletTable = 'wallet';
    static SellerPicTable = 'pic';



}



const UserDB = DbConnection;
module.exports = { TableName, UserDB };
