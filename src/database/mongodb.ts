import { Db, MongoClient, MongoClientOptions } from "mongodb"
import { formatLog } from "@/utils/utils"

// Create cached connections variable
let cachedDB: Db | null = null

// Function to connect to MongoDB
export default async function connectToDatabase(): Promise<Db> {
    // If the database connection is cached, use it instead of create a new connection
    if (cachedDB) {
        console.info(formatLog("Using cached client!"))
        return cachedDB
    }

    console.info(formatLog("No client found! Creating a new one."))
    // If no connection is cached, create a new one
    const client = new MongoClient(process.env.ATLAS_URI_PROD as string)

    try {
        await client.connect();

    } catch (e) {
        console.error(e);
    }
    const db: Db = client.db(process.env.DB_NAME)
    cachedDB = db

    return cachedDB
}