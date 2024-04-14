import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Extend the collections object to include users
export const collections: { 
    events?: mongoDB.Collection,
    users?: mongoDB.Collection  // Added users collection
} = {};

export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
    console.log(process.env.DB_CONN_STRING!);

    try {
        await client.connect();
        const db: mongoDB.Db = client.db(process.env.DB_NAME);

        // Fetch the events collection
        const eventsCollection: mongoDB.Collection = db.collection(process.env.EVENTS_COLLECTION_NAME!);
        collections.events = eventsCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and events collection: ${eventsCollection.collectionName}`);

        // Fetch the users collection
        const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME!);
        collections.users = usersCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and users collection: ${usersCollection.collectionName}`);

    } catch (error) {
        console.error("Failed to connect to the database!", error);
        process.exit(1);
    }
}
