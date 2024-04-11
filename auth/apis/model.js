const mongoose = require('mongoose');
const { Schema } = mongoose;
const { TableName, UserDB } = require('../utils/tables');

const platformList = ['Ios', 'Android', 'Mac', 'Web'];
const profileStatusList = ["NotCreate", "Pending", "Accept", "Decline"];
const maritalStatusList = ["Single", "Married", "Other"];
const genderList = ["Male", "Female", "Other"];
const workingList = ["Yes", "No"];

const SelMobileOtpSchema = new Schema({
    mobile: { type: String, required: true, maxLength: 12 },
    otp: { type: String, required: true, maxLength: 6 },
}, { timestamps: true });


const SelAuthSchema = new Schema({
    mobile: { type: String, maxLength: 12, required: true },
    fcmToken: { type: String, maxLength: 500, default: '' },
    deviceName: { type: String, maxLength: 10, enum: platformList }
}, { timestamps: true });


//. ProfileModdel-------

const SelProfileSchema = new Schema({
    _id: { type: mongoose.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, ref: TableName.SellerAuthTable, required: true },
    profileStatus: { type: String, default: "NotCreate", enum: profileStatusList, maxLength: 10 },
    is_busy: { type: Boolean, default: false },
    online_chat: { type: Boolean, default: false },
    online_videoCall: { type: Boolean, default: false },
    online_audioCall: { type: Boolean, default: false },
    online_live: { type: Boolean, default: false },
    waitTime: { type: Number, default: 5, maxLength: 2 },
    pricePerMin: { type: Number, default: 1, required: true, maxLength: 2 },
    username: { type: String, default: '', required: true, maxLength: 50 },
    name: { type: String, required: true, maxLength: 50 },
    email: { type: String, required: true, maxLength: 50 },
    mobile: { type: String, maxLength: 12, required: true, },
    emergencyMobile: { type: String, maxLength: 12, required: true },
    emergencyName: { type: String, maxLength: 40, required: true },
    pic: { type: String, default: '' },
    // picUrl: { type: String, default: '' },
    // // Skills Data
    primarySkills: { type: [String], required: true, maxLength: 200, default: [] },
    allSkills: { type: [String], required: true, maxLength: 200, default: [] },
    langauge: { type: [String], required: true, maxLength: 200, default: [] },
    experience: { type: Number, required: true, min: 1, max: 40, default: 0 },
    workHour: { type: Number, required: true, min: 1, max: 18, default: 0 },
    orders: { type: Number, default: 0, },
    ratings: { type: Number, default: 0, },
}, { timestamps: true });


const SelMobileOtpModel = UserDB.model(TableName.SellerMobileTable, SelMobileOtpSchema);
const SelAuthModel = UserDB.model(TableName.SellerAuthTable, SelAuthSchema);
const SelProfileModel = UserDB.model(TableName.SellerProfileTable, SelProfileSchema);

module.exports = { SelMobileOtpModel, SelAuthModel, SelProfileModel }
