const express = require('express');
const { router } = require('./apis/router');

const { loadEnv } = require('./utils/loadenv.js');
loadEnv();

const cors = require('cors'); //Setup CORS
const app = express();


app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/astrologer', router);


app.listen(3500, () => { console.log('pics server start at 3500'); });





