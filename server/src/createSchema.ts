import { buildSchema, } from "type-graphql";
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

const options = {
    host: '127.0.0.1',
    port: 6379,
    retryStrategy: (times: number) => {
        // reconnect after
        return Math.min(times * 50, 2000);
    }
};

const pubsub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options)
});

const createSchema = () => {
    return buildSchema({
        resolvers: [
            __dirname + '/modules/**/!(*.test).ts'
        ],
        pubSub: pubsub
    });
}




export default createSchema;