const { SelMobileOtpModel } = require('./model.js');
const { postMethod } = require('../utils/axios.js');


class Otp {
    static GenerateOtp = async (mobile) => {
        try {
            const genVal = Math.floor(1000 + Math.random() * 9999);
            var otp = String(genVal);
            otp = otp.substring(0, 4);

            const url = process.env.OTP_URL1 + mobile.toString() + "&message=" + otp.toString() + process.env.OTP_URL2
            const response = await postMethod(url);
            return response.status == 200 ? otp : false
        }
        catch (err) {
            console.log("Error => ", err);
            return false;
        }

    }

    static VerfiyOtp = async (mobile, otp) => {
        try {
            const user = await SelMobileOtpModel.findOne({ mobile: mobile });


            if (user.otp == otp) {
                await SelMobileOtpModel.findOneAndUpdate({ mobile: mobile });
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            console.log("Error => ", err);
            return false;

        }
    }
}


module.exports = { Otp }