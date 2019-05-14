const redis = require('redis');
const promisifyAll = require('util-promisifyall');
const serialize = require('serialize-javascript');

const USER_EXPIRY = 60 * 60 * 24;
const MESSAGE_EXPIRY = 60 * 60;

const redisClient = redis.createClient(process.env.REDIS_URL);

export class MessageClient {
  constructor() {
    this.key = 'messages';
    this.client = redisClient;
  }
  
  push(message) {
    
  }
};

export class UserClient {
  constructor() {
    this.client = redisClient;
  }
}