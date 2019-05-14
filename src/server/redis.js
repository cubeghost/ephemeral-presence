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

/*
  normally doing json in redis this way (stringifying and parsing
  on the client, as opposed to ReJSON) isn't ideal, but it's ok 
  for now because we only expect to have one server connecting 
  to redis
*/

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
  
  getKey(id) {
    return `${this.prefix}:${id}`;
  }
  
  async list() {
    return await this.client.scanAsync('0', 'MATCH', `${this.prefix}:`, 'COUNT', '20');
  }
  
  async add(user) {
    return await this.client.setAsync(
      this.getKey(user.id),
      serialize(user)
    );
  }
  
  async remove(id) {
    return await this.client.delAsync(this.getKey(id));
  }
}