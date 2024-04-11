const mongoose = require('mongoose');
const { loadEnv } = require('./loadenv.js');

loadEnv();
function MongoDbConnection({ dbHost, dbUser, dbPassword, dbName, }) {

    const DB_URL = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;
    const db = mongoose.createConnection(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    db.on('error', function (error) {
        console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });

    db.on('connected', function () {
        mongoose.set('debug', function (col, method, query, doc) {
            console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
        });
        console.log(`MongoDB :: connected ${this.name}`);
    });

    db.on('disconnected', function () {
        console.log(`MongoDB :: disconnected ${this.name}`);
    });
    return db;
}



const DbConnection = MongoDbConnection({
    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER || 'root',
    dbPassword: process.env.DB_PASSWORD || 'password',
    dbName: process.env.DB_NAME || 'astrouser',
});
// const SellerDbConnection = MongoDbConnection(process.env.Seller_DB_URL);
// const db2 = MongoDbConnection(DB_URL2);

module.exports = { DbConnection };
// module.exports = { MongoDbConnection }












// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();


// function MongoDbConnection(URL) {
//     const db = mongoose.createConnection(URL, { useNewUrlParser: true, useUnifiedTopology: true });

//     db.on('error', function (error) {
//         console.log(`MongoDB :: connection ${this.name} ${JSON.stringify(error)}`);
//         db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
//     });

//     db.on('connected', function () {
//         mongoose.set('debug', function (col, method, query, doc) {
//             console.log(`MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
//         });
//         console.log(`MongoDB :: connected ${this.name}`);
//     });

//     db.on('disconnected', function () {
//         console.log(`MongoDB :: disconnected ${this.name}`);
//     });
//     return db;
// }



// const DbConnection = MongoDbConnection(process.env.DB_URL);
// // const db2 = MongoDbConnection(DB_URL2);

// module.exports = { DbConnection };




// // const mongoose = require('mongoose');
// // const MongoDbConnection = async (DB_URL) => {
// //     try {
// //         const myurl = "mongodb+srv://astrodb1:rahulkumar87@serverlessinstance0.9wyz2yr.mongodb.net/dhaam_customer?retryWrites=true&w=majority"

// //         const dbs = mongoose.createConnection(myurl, { useNewUrlParser: true, });
// //         // const dbs = mongoose.connect(DB_URL, { useNewUrlParser: true, });
// //         console.log("connectoon ", dbs)
// //         return dbs;
// //     } catch (e) {
// //         console.log("db error ", e);
// //     }
// // }

// // module.exports = { MongoDbConnection }