import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();
let redisClient;

try {
  redisClient = createClient({
    
    url: process.env.REDIS_URL,
    socket: {
      tls: true,
      rejectUnauthorized: false
    }
  });

  redisClient.on("connect", () => {
    console.log("⚡ Redis (Upstash) connected");
  });

  redisClient.on("error", (err) => {
    console.error("❌ Redis error:", err.message);
  });

  await redisClient.connect();
} catch (err) {
  console.warn("⚠️ Redis not available, caching disabled");
  redisClient = null;
}

export default redisClient;
