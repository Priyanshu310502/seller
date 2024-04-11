const express = require('express');
const { router } = require('./apis/router');

const cors = require('cors');

const { loadEnv } = require('./utils/loadenv');
loadEnv();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/astrologer', router);


app.listen(3000, () => {
    console.log('auth server start 3000');
});



