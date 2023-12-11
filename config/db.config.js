const mongoose = require('mongoose');

const DB_NAME = process.env.DB_NAME || 'Proyecto';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

mongoose
.connect(`${MONGO_URI}/${DB_NAME}`)
.then(() => console.log(`Conected to db: ${DB_NAME}`))
.catch((err) => console.error(`error connecting to Mongo: ${err}`))

process.on('SIGINT', () => {
    mongoose.connection
        .close()
        .then(() => {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        })
        .catch((err) => {
            console.error(`Mongoose default connection disconnection error: ${err}`)
        });
});