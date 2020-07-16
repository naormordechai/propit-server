import { MongoClient } from 'mongodb';

var dbConn: any = null;

export function connectToMongo() {
    if (dbConn) return Promise.resolve(dbConn);
    const mongoClient = MongoClient;
    const uri = 'mongodb+srv://naor:naormor315@cluster0.knc11.mongodb.net/todosDB?retryWrites=true&w=majority';
    return mongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client: any) => {

            console.log('Connected to MongoDB');
            // If we get disconnected (e.g. db is down)
            client.on('close', () => {
                console.log('MongoDB Disconnected!');
                dbConn = null;
            });
            dbConn = client.db('todosDB');
            return dbConn;
        })
}

