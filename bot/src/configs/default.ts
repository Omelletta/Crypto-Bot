import * as dotenv from 'dotenv'
import * as redis from 'redis'
import mongoose, { ConnectOptions } from 'mongoose'

// Env configs
dotenv.config();

export const redisCli = redis.createClient({ host:'CryptoBot', port: 6379 } as Omit<redis.RedisClientOptions<never, Record<string, never>>, "modules">)

// Mongo configs
const connStr: string = process.env.MONGO_DB
const opts: ConnectOptions = { useNewUrlParser: true } as ConnectOptions
const callback = () => {console.log("Connected to MongoDB")}
export const connectMongoDB = () => {mongoose.connect(connStr, opts, callback)}


// Redis configs

export const connectRedis = async () => {
    await redisCli.connect();
    redisCli.on('error', (err) => console.log('Redis Client Error', err));
    redisCli.set("Something", "Cool")
    const val = await redisCli.get("Something")
    console.log(val)
}