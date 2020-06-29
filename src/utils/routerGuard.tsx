import * as React from 'react';
import { Route,Redirect, withRouter } from 'react-router-dom';
import {routerConfig} from '../router/config';
import client from "../store/index";
import {GET_LOGIN_STATUS} from "@/page/login/store/gql";
interface propsModel {
    config:any[],
    path:string,
    component:React.Component
} 

class FrontendAuth extends React.Component<any,propsModel>{
    render(){
        const { location,path,component:Component } = this.props;
        const { pathname } = location;
        const loginStore = client.readQuery({query:GET_LOGIN_STATUS});
        const isLogin: boolean =  localStorage.getItem('token') || loginStore.isLogin;
        console.log("isLogin",isLogin)
        // 如果该路由不用进行权限校验，登录状态下登陆页除外
        // 因为登陆后，无法跳转到登陆页
        // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
        const targetRouterConfig = routerConfig.find((v:any) => v.path === pathname);
        if(targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
            return <Route path={path} render={props => (<Component {...props} />)} />
        }
        if(isLogin){
                // 如果路由合法，就跳转到相应的路由
            if(targetRouterConfig || pathname === '/'){
                return <Route path={path} render={props => (<Component {...props} />)} />
            }else{
                // 如果路由不合法，重定向到 404 页面
                return <Redirect to='/404' />
            }
        }else{
            // 非登陆状态下，当路由合法时且需要权限校验时，跳转到登陆页面，要求登陆
            if(targetRouterConfig && targetRouterConfig.auth){
                console.log('路由合法但未登录')
                return <Redirect to='/login' />
            }else{
                console.log('路由不合法')
                // 非登陆状态下，路由不合法时，重定向至 404
                return <Redirect to='/404' />
            }
        }
    }
}

export default withRouter(FrontendAuth)
