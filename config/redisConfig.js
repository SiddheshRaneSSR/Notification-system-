const Redis = require("ioredis");

const connectRedis = async () => {
  try {
    const redis = new Redis({
      host: process.env.REDIS_HOST || "127.0.0.1",
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD || null, // optional
      db: 0,
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
