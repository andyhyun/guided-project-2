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

app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("films_characters")
        const films_characters = await collection.aggregate([
            {
                $lookup: {
                    from: "characters",
                    localField: "character_id",
                    foreignField: "id",
                    as: "character_details"
                }
            },
            {
                $match: {
                    film_id: +id
                }
            }
        ]).toArray();
        res.json(films_characters);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("films_planets")
        const films_planets = await collection.aggregate([
            {
                $lookup: {
                    from: "planets",
                    localField: "planet_id",
                    foreignField: "id",
                    as: "planet_details"
                }
            },
            {
                $match: {
                    film_id: +id
                }
            }
        ]).toArray();
        res.json(films_planets);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("films_characters")
        const films_characters = await collection.aggregate([
            {
                $lookup: {
                    from: "films",
                    localField: "film_id",
                    foreignField: "id",
                    as: "film_details"
                }
            },
            {
                $match: {
                    character_id: +id
                }
            }
        ]).toArray();
        res.json(films_characters);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("films_planets")
        const films_planets = await collection.aggregate([
            {
                $lookup: {
                    from: "films",
                    localField: "film_id",
                    foreignField: "id",
                    as: "film_details"
                }
            },
            {
                $match: {
                    planet_id: +id
                }
            }
        ]).toArray();
        res.json(films_planets);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

// Return the characters born on a given planet
app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const id = req.params.id;
        const client = await MongoClient.connect(url)
        const db = client.db(dbName)
        const collection = db.collection("characters")
        const planet_characters = await collection.aggregate([
            {
                $lookup: {
                    from: "planets",
                    localField: "homeworld",
                    foreignField: "id",
                    as: "planet_details"
                }
            },
            {
                $match: {
                    homeworld: +id
                }
            }
        ]).toArray();
        res.json(planet_characters);
    } catch(err) {
        console.error("Error:", err)
        res.status(500).send("couldn't get items");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// db.characters.aggregate([{$lookup: {from: "films_characters", localField: "id", foreignField: "character_id", as: "films_characters_alias"}}])