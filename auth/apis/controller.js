const { SelMobileOtpModel, SelAuthModel, SelProfileModel } = require('./model.js');
const { Otp } = require('./otp_logic.js')

const { SelTokenModel } = require('../utils/token.js');
const { AuthToken } = require('@selfcreatepackage/authtoken');
const regex = /^[6789]\d{9}$/;


class UserController {
    static SendOtp = async (req, res) => {
        const { mobile } = req.body;
        try {
            if (mobile.match(regex) && mobile.length == 10) {
                const otp = await Otp.GenerateOtp(mobile);

                if (otp == false) {
                    return res.status(401).json({ "msg": "Otp Not Send", "success": 1 });
                }
                // find mobile => create or update
                const count = await SelMobileOtpModel.find({ mobile: mobile });

                count.length == 0 ?
                    await SelMobileOtpModel({ mobile: mobile, otp: otp }).save() :
                    await SelMobileOtpModel.findOneAndUpdate({ mobile: mobile }, { otp: otp });
                return res.status(200).json({ "msg": "Send Otp to Mobile Number", "success": 0, "data": otp });
            }
            else {
                return res.status(401).json({ "msg": "Mobile Number Not Valid", "success": 1 });
            }
        } catch (err) {
            console.log(err)
            return res.status(500).send({ "msg": `Server Error`, "status": 1 });
        }
    }



    static SignIn = async (req, res) => {
        const { mobile, otp, fcmToken, deviceName } = req.body;
        const usr = await SelAuthModel.find({ mobile: mobile });
        try {
            const verifyOtps = await Otp.VerfiyOtp(mobile, otp);
            if (verifyOtps == true) {
                const prof = await SelProfileModel.find({ mobile: mobile });
                const profileStatus = prof.length == 1 ? prof[0].profileStatus : "NotCreate";

                if (usr.length == 0) {
                    //  Id Store in AuthTable 
                    const usr1 = await SelAuthModel({ mobile: mobile, fcmToken: fcmToken, deviceName: deviceName }).save();
                    // const token = await CreateToken(usr1.id, mobile, profileStatus);

                    const token = await new AuthToken(SelTokenModel, process.env.JWT_SECRET_KEY).createToken({
                        jwtPayload: {
                            id: usr1.id,
                            profileStatus: prof.profileStatus,
                            mobile: mobile
                        }
                    })
                    return res.status(201).json({ 'msg': 'Register Successful', 'success': 0, 'token': token, "profileStatus": profileStatus });
                }
                else {

                    const user = await SelAuthModel.updateOne({ mobile: mobile }, { fcmToken: fcmToken, deviceName: deviceName });

                    const toks = await new AuthToken(SelTokenModel, process.env.JWT_SECRET_KEY).createToken({
                        jwtPayload: {
                            id: user.id,
                            profileStatus: prof.profileStatus,
                            mobile: mobile
                        }
                    })
                    return res.status(200).json({ 'msg': 'Login Success', 'success': 0, 'token': toks, "profileStatus": profileStatus });
                }
            } else {
                return res.status(401).json({ 'msg': 'Otp Invalid', 'success': 1 });
            }
        } catch (err) {
            return res.status(500).json({ "msg": `Server Error ${err}`, "success": 1, });
        }
    }

    static SignOut = async (req, res) => {
        try {
            const userId = req.user.id;
            //  Id Store in AuthTable 
            const toksclear = await new AuthToken(SelTokenModel, process.env.JWT_SECRET_KEY).clearToken({
                jwtPayload: {
                    id: userId
                }
            })
            await SelAuthModel.findOneAndUpdate({ _id: userId }, { fcmToken: '', deviceName: '' });
            return res.status(200).json({ 'msg': 'LogOut Successful', 'success': 0, 'cleartoken': toksclear });
        } catch (err) {
            return res.status(500).json({ "msg": `Error`, "success": 1, });
        }

    }

}




module.exports = { UserController }