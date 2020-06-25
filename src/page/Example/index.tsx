import React from 'react';
import {useQuery} from "@apollo/react-hooks";
import {GET_LOGIN_STATUS} from "@/page/login/store/gql";

type res = {
    isLogin: boolean
}

function ExchangeRates() {
    const {data,error,loading} = useQuery<res>(GET_LOGIN_STATUS);
    if(error) return <span>error</span>
    if(loading) return <span>loading...</span>
  return (
      <div>
          {data&&String(data.isLogin)}
      </div>
  )
}

export default ExchangeRates