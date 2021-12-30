import express from 'express';
import { connectRedis, connectMongoDB } from './configs/default';

// Basic app configs
const app = express();
const port = 3000;

// Default route for testing server availability
app.get('/', (_, res) => {
    res.send('Hello World!');
});

// Configs
connectMongoDB()
connectRedis()

// Init app
app.listen(port, () => {

    return console.log(`Express is listening at http://localhost:${port}`);
});