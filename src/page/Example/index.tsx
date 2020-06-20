import React, { useCallback, useState } from 'react';
import { useQuery,useMutation,useApolloClient } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {Button} from "antd";
const GET_TODOS = gql`
   
       query checkLogin($status: Boolean!){
           isLogin(type: $status) @client
       }
   
`;

function ExchangeRates() {
    const { loading, error, data} = useQuery(GET_TODOS,{variables:{status:true}});
    const [rn,setRn] = useState(false);
    console.log(data)
  const client = useApolloClient();
    const setLogin = useCallback(()=>{
        client.writeData({data:{isLogin:true}});
        setRn(true)
    },[])
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