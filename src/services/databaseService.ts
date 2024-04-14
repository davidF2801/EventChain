import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import EventModel from "../models/eventModel";
export const collections: { EventModel?: mongoDB.Collection } = {};

export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING!);
    console.log(process.env.DB_CONN_STRING!)
    try {
        await client.connect();
        const db: mongoDB.Db = client.db(process.env.DB_NAME);
        const eventsCollection: mongoDB.Collection = db.collection(process.env.EVENTS_COLLECTION_NAME!);

        collections.EventModel = eventsCollection;

        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${eventsCollection.collectionName}`);
    } catch (error) {
        console.error("Failed to connect to the database!", error);
        process.exit(1);
    }
}
