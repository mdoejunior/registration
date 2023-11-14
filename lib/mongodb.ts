import {MongoClient, Collection} from "mongodb";

export async function connectToMongoDB(): Promise<MongoClient> {
    const uri = 'mongodb+srv://Issa:%40Issaally99@cluster0.cgemu.mongodb.net/masasi?retryWrites=true&w=majority';

    if (!uri) {
        throw new Error("MONGODB_URI environment variable is not defined");
    }

    const client = new MongoClient(uri, {
        connectTimeoutMS: 10000,
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB");
        return client;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

export async function disconnectFromMongoDB(client: MongoClient): Promise<void> {
    await client.close();
}

export async function getCollection(client: MongoClient, database: string, collection: string): Promise<Collection> {
    return client.db(database).collection(collection);
}