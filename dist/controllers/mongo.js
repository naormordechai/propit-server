"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
var dbConn = null;
function connectToMongo() {
    if (dbConn)
        return Promise.resolve(dbConn);
    const mongoClient = mongodb_1.MongoClient;
    const uri = 'mongodb+srv://naor:naormor315@cluster0.knc11.mongodb.net/todosDB?retryWrites=true&w=majority';
    return mongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
        console.log('Connected to MongoDB');
        // If we get disconnected (e.g. db is down)
        client.on('close', () => {
            console.log('MongoDB Disconnected!');
            dbConn = null;
        });
        dbConn = client.db('todosDB');
        return dbConn;
    });
}
exports.connectToMongo = connectToMongo;
