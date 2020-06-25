import gql from "graphql-tag";

/**
 * 获取登陆状态
 */
export const GET_LOGIN_STATUS = gql`
    
       query getLoginStatus {
           isLogin @client
       }
    
`