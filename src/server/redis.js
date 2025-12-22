import Redis from 'ioredis';
import serialize from 'serialize-javascript';

// const debug = createDebug('presence:redis');

const redisClient = new Redis(process.env.REDIS_URL);

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
    const list = await this.client.lrange(this.key, 0, 99) || [];
    return list.map(JSON.parse);
  }
  
  async push(message) {
    await this.client.lpush(
      this.key,
      serialize(message)
    );
    return await this.client.ltrim(this.key, 0, 99);
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
  
  async scan(cursor = '0', accumulator = []) {
    const response = await this.client.scan(
      cursor, 'MATCH', `${this.prefix}:*`, 'COUNT', '10'
    );
    
    cursor = response[0];
    accumulator = accumulator.concat(response[1]);
    
    // eslint-disable-next-line eqeqeq
    if (cursor == '0') {
      if (accumulator.length > 0) {
        return await this.client.mget(accumulator);
      } else {
        return accumulator;
      }
    } else {
      return await this.scan(cursor, accumulator);
    }
  }
  
  async list() {
    const list = await this.scan();
    return list.map(JSON.parse);
  }
  
  async set(user) {
    return await this.client.set(
      this.getKey(user.id),
      serialize(user)
    );
  }
  
  async get(id) {
    const string = await this.client.get(this.getKey(id));
    if (string) {
      return JSON.parse(string);
    } else {
      return null;
    }
  }
  
  async remove(id) {
    return await this.client.del(this.getKey(id));
  }
  
  async removeMultiple(ids) {
    const keys = ids.map(this.getKey.bind(this));
    return await this.client.del(keys);
  }
}