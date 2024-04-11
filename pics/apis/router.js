const express = require('express');
const router = express.Router();
const { PicController } = require('../apis/controller.js');
const { SelTokenModel } = require('../utils/token.js');
const { AuthToken } = require('@selfcreatepackage/authtoken')

const { picSchema } = require('../validators/validationSchema.js');
const { validation } = require('../validators/validationMiddleware.js');


const baseurl = '/pics'

router.use(new AuthToken(SelTokenModel, process.env.JWT_SECRET_KEY).verifyToken({}))

router.get(baseurl, PicController.GetPic);
router.post(baseurl, validation(picSchema), PicController.PostPic);
router.put(baseurl, PicController.UpdatePic);
router.delete(baseurl, PicController.DeletePic);






module.exports = { router };