const redis = require('redis');
const promisifyAll = require('util-promisifyall');
const serialize = require('serialize-javascript');
const debug = require('debug')('presence:redis');

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
    debug('list', list);
    return list || [];
  }
  
  async push(message) {
    let index = await this.client.rpush(
      this.key,
      serialize(message)
    );
    debug('push', index)
    return
  }
};

export class UserClient {
  constructor() {
    this.client = redisClient;
  }
}