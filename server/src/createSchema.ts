import { buildSchema, } from "type-graphql";
import { PubSub } from 'graphql-subscriptions';
//import { GraphQLSchema } from 'graphql';

const pubsub = new PubSub();

const createSchema = () => {
    return buildSchema({
        resolvers: [
            __dirname + '/modules/**/!(*.test).ts'
        ],
        pubSub: pubsub
    });
}




export default createSchema;