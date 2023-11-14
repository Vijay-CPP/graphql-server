import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// importing types
import { typeDefs } from './schema.js';

// importing resolvers
import { resolvers } from './resolvers.js';

// server setup
const server = new ApolloServer({
    // typeDefs - definitions of diff types of data
    typeDefs,

    // resolvers
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("Server ready at port ", 4000);