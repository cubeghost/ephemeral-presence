const redis = require('redis');
const promisifyAll = require('util-promisifyall');
const serialize = require('serialize-javascript');

promisifyAll(redis.RedisClient.prototype);
promisifyAll(redis.Multi.prototype);

const USER_EXPIRY = 60 * 60 * 24;
const MESSAGE_EXPIRY = 60 * 60;

const redisClient = redis.createClient(process.env.REDIS_URL);

export class MessageClient {
  constructor() {
    this.key = 'messages';
    this.client = redisClient;
  }
  
  async list() {
    const list = await this.client.lrange(this.key, 0, 100);
    console.log(list);
    return list || [];
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