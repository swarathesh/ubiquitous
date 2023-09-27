import { createClient } from 'redis';
import { config } from 'dotenv';


config();
// create and connect redis client to local instance.
const client = await createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 17503
    }
})
.on('error', err => console.log('Redis Client Error', err))
.connect();



// export the Redis client
export default client;