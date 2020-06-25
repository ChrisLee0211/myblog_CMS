import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';
import config from "./config";


const cache = new InMemoryCache();
cache.writeData({
    data: config.data
  });
const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
    cache,
    resolvers:config.resolvers
});

export default client;