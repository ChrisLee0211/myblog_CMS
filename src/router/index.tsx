
import * as React from 'react';
import { HashRouter,Switch, Route } from 'react-router-dom';
import Login from '../page/login';
import NotFound from '../page/404';
import LayouComponent from '../page/Layout'
import  FrontendAuth  from '../utils/routerGuard';
 
export class Router extends React.Component{
    render(){
        return (
            <HashRouter>
                <Switch>
                    {/* <Route exact path="/login" component={Login}/> */}
                    <Route exact path="/404" component={NotFound}/>
                    <FrontendAuth path="/" component={LayouComponent}  />
                </Switch>
            </HashRouter>
        );
    }
}
