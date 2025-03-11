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

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("characters")
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("films")
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("planets")
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("characters")
        const characters = await collection.findOne({id: +id});
        res.json(characters);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("films")
        const films = await collection.findOne({id: +id});
        res.json(films);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.get('/api/planets/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("planets")
        const planets = await collection.findOne({id: +id});
        res.json(planets);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});