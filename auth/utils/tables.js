const mongoose = require('mongoose');
const { DbConnection }= require('../utils/db')
class TableName {

    //. seller 
    static SellerTokenTable = 'token';
    static SellerMobileTable = 'mobile_otp';
    static SellerAuthTable = 'auth';
    static SellerProfileTable = 'profile';
    static SellerProfileDetailTable = 'profile_detail';
    static SellerTranscationTable = 'transcation';
    static SellerWalletTable = 'wallet';



}


const UserDB = DbConnection

module.exports = { TableName, UserDB };
