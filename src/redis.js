const promisifyAll = require('util-promisifyall');
const redis = promisifyAll(require('redis'));
const serialize = require('serialize-javascript');

const USER_EXPIRY = 60 * 60 * 24;
const MESSAGE_EXPIRY = 60 * 60;

const redisClient = redis.createClient(process.env.REDIS_URL);

export class MessageClient {
  constructor() {
    this.key = 'messages';
    this.client = redisClient;
  }
  
  async list() {
    return this.client.lrange(this.key, 0, 100);
  }
  
  async push(message) {
    return await this.client.rpush(
      this.key,
      serialize(message)
    );
  }
};

export class UserClient {
  constructor() {
    this.client = redisClient;
  }
}