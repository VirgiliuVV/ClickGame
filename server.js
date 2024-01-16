import { MongoClient } from 'mongodb';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';

config()
const mongoUrl = process.env.MONGO_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;


async function connectToMongo() {
    try {
        const client = await MongoClient.connect(mongoUrl);
        return client.db();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

const db = await connectToMongo();
console.log('Connected to database:', db.databaseName);

const collection = db.collection(process.env.MONGO_COLLECTION.toString());
console.log('Using collection:', collection.collectionName);


app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html', 'js'] }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.get('/getTopList', async (req, res) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('UserRecord');

        const topList = await collection.find().sort({ time: 1 }).limit(10).toArray();

        res.status(200).send(topList);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/createData', express.json(), async (req, res) => {
    const { name, time } = req.body;

    try {
        const newRecord = { name, time };
        await collection.insertOne(newRecord);

        res.status(200).send()

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

