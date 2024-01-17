import express from "express";
import connectToMongoDB from "./db/connect.js";
import router from "./routes/urlRoute.js";
const app = express();
const PORT = process.env.port || 3000;
const dbName = 'short-url';
const mongodbURL = `mongodb://localhost:27017/${dbName}`;

connectToMongoDB(mongodbURL)
    .then(() => console.log("MongoDb is connected."))
    .catch((error) => console.log(error));

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => { console.log(`Server has started on port ${PORT}`) });