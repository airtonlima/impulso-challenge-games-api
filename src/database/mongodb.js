const mongoose = require('mongoose');
const { MONGODB } = require('./config');

class MongoDB
{
    constructor() {}

    async connect() {
        try {
            const { USERNAME, PASSWORD, HOST } = MONGODB;
            return await mongoose.createConnection(`mongodb+srv://${USERNAME}:${PASSWORD}@${HOST}/?retryWrites=true&w=majority`).asPromise();
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new MongoDB();
