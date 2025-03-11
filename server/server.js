import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const port = process.env.EXPRESS_PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/planets', (req, res) => {
    res.json({ message: 'hi' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});