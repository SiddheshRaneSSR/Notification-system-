const Redis = require("ioredis");
/*
const connectRedis = async () => {
  try {
    const redis = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null, // optional
      db: process.env.REDIS_DB_NAME || 0, // optional
    });

    // Test connection
    await redis.ping();
    console.log("✅ Redis Connected");

    return redis; // return the instance
  } catch (error) {
    console.error(`❌ Redis Connection Error: ${error.message}`);
    process.exit(1); // Stop app if Redis fails
  }
};

module.exports = connectRedis;

*/

let instance = null;

class RedisClient{
  constructor(){
    if(instance)return instance;

    this.client = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null, // optional
      db: process.env.REDIS_DB_NAME || 0, // optional
    });

    this.client.on("error", (err) => {
      console.error("Redis Client Error", err);
    });

    this.client.on("connect", () => {
      console.log("Redis client connected");
    });

    this.client.on("reconnecting", () => {
      console.log("Redis client reconnecting");
    });

    instance = this.client;
    return instance;
    }

    getClient(){
      return this.client;
    }
}


module.exports = new RedisClient();
