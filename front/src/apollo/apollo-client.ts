import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql', // Remplacez par l'URI de votre API GraphQL
    cache: new InMemoryCache(),
});

export default client;