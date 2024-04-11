const express = require('express');
const router = express.Router();
const { UserController } = require('./controller.js');

const { mobileSchema, otpSchema, combinedSchema, } = require('../validators/validationSchema.js');
const { validation } = require('../validators/validationMiddleware.js');

const { SelTokenModel } = require('../utils/token.js');
const { AuthToken } = require('@selfcreatepackage/authtoken')

//.routes----
router.post('/sendOtp', validation(mobileSchema), UserController.SendOtp);
router.post('/signIn', validation(combinedSchema), UserController.SignIn);

router.use(new AuthToken(SelTokenModel, process.env.JWT_SECRET_KEY).verifyToken({}))

router.post('/signOut', UserController.SignOut);


module.exports = { router };