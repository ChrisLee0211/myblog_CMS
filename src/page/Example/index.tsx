import React, { useCallback } from 'react';
import { useQuery,useMutation,useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {Button} from "antd";
const GET_TODOS = gql`
  {
    todos @client {
      id
      completed
      text
    }
    visibilityFilter @client
    islogin @client
    networkStatus @client{
        __typename
        isConnected
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data} = useQuery(GET_TODOS);
  const client = useApolloClient();
  const {islogin} = data;
    const setLogin = useCallback(()=>{
        client.writeData({data:{islogin:!islogin}})
    },[islogin])
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(data)
  return (
      <div>
      
      <p>{String(data.islogin)}</p>
    <Button onClick={()=>{setLogin()}}>测试</Button>
      </div>
  )
}

export default ExchangeRates