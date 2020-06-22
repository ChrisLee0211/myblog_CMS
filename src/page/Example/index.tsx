import React, { useCallback, useState } from 'react';
import { useQuery,useMutation,useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {Button} from "antd";
const GET_LOGIN_STATUS = gql`
  query getLoginStatus  {
        todos @client {
            __typename,
            text
        }
        isLogin @client
    }
   
`;

const SET_LOGIN_STATUS = gql`
    mutation setLoginStatus($status: boolean!) {
        setLoginStatus(status:$status) @client
    }
`

function ExchangeRates() {
    const { loading, error, data} = useQuery(GET_LOGIN_STATUS);
    const [updateStatus] = useMutation<any,any>(SET_LOGIN_STATUS,{}) as any
    const [rn,setRn] = useState(false);
    const {todos,isLogin} = data;
  const client = useApolloClient();
    const setLogin = useCallback(()=>{
        updateStatus({variables:{status:true}})
        setRn(true)
    },[todos,isLogin])
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
      <div>
      
      <p>{data ? JSON.stringify(data):"null" }</p>
    <Button onClick={()=>{setLogin()}}>测试</Button>
      </div>
  )
}

export default ExchangeRates