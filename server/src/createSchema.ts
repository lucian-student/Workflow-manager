import { buildSchema, } from "type-graphql";

//import { GraphQLSchema } from 'graphql';

const createSchema = () => {
    return buildSchema({
        resolvers: [
            __dirname + '/modules/**/!(*.test).ts'
        ]
    });
}




export default createSchema;