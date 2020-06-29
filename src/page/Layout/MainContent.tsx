import React from 'react';
import {Layout} from 'antd';
import { Route,Switch,Redirect } from 'react-router-dom';
import {routerConfigModel} from '../../router/config';

export interface ComponentProps {
    config:routerConfigModel[]
}


export const MainContent: React.FC<ComponentProps> = (props: ComponentProps) => {
    const {config} = props;
    const {Content} = Layout;
    return (
        <Content id="Layout-Content">
            <Switch>
            {config.map(ele =>  <Route exact  render={() => <ele.component />} key={ele.path} path={ele.path} />)}
            <Redirect exact from="/" to="/trans" />
            </Switch>
        </Content>
    )
}

