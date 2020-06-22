import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient,{gql} from "apollo-boost";
import * as serviceWorker from './serviceWorker';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();
cache.writeData({
    data: {
      todos: [],
      visibilityFilter: 'SHOW_ALL',
      isLogin:false,
      networkStatus: {
        __typename: 'NetworkStatus',
        isConnected: false,
      },
    },
  });
const client = new ApolloClient({
    uri: "https://48p1r2roz4.sse.codesandbox.io",
    cache,
    resolvers: { 
        Query: {
            isLogin(root,args,ctx,info){
                console.log("root",root)
                console.log("args",args)
                console.log("ctx",ctx)
                console.log("info",info);
                return false
            }
        },
        Mutation: {
            setLoginStatus(root,args,ctx,info){
                console.log("root",root)
                console.log("args",args)
                console.log("ctx",ctx)
                console.log("info",info);
            }
        }
     },
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
