const axios = require("axios")

async function postMethod(URL) {
    try {
        const promise = axios.post(URL);
        const dataPromise = promise.then((response) => response);
        return dataPromise;
    } catch (err) {
        console.log(err);
    }
}



module.exports = { postMethod }