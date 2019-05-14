const redis = require('redis');

const USER_EXPIRY = 60 * 60 * 24;
const MESSAGE_EXPIRY = 60 * 60;

const redisClient = redis.createClient(process.env.REDIS_URL);

export class MessageClient {
  constructor() {
    this.client = redisClient;
  }
  
  
};

export class UserClient {
  constructor() {
    this.client = redisClient;
  }
}