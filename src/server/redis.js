const _ = require('lodash');
const redis = require('redis');
const promisifyAll = require('util-promisifyall');
const serialize = require('serialize-javascript');
const debug = require('debug')('presence:redis');
const { promisify } = require('util');

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
    const list = await this.client.lrangeAsync(this.key, 0, 100) || [];
    return list.map(message => JSON.parse(message));
  }
  
  async push(message) {
    return await this.client.rpushAsync(
      this.key,
      serialize(message)
    );
  }
};

export class UserClient {
  constructor() {
    this.prefix = 'user';
    this.client = redisClient;
  }
  
  async list() {
    return this.client.hscanAsync('');
  }
  
  async add(user) {
    const hashArgs = _.flow(_.toPairs, _.flatten)(user);
    return this.client.hmsetAsync(
      `${this.prefix}:${user.id}`,
      hashArgs
    );
  }
  
  async remove() {}
}