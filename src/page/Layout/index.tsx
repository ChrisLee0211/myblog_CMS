import React, {useMemo } from 'react';
import { Layout } from 'antd';
import { History } from 'history'

import {MainContent} from './MainContent';
import MainHeader from './MainHeader';
import {SiderMenu} from './SiderMenu'

import { routerConfig } from '../../router/config';
import "./index.scss"

export interface ComponentProps {
    history:History,
}

const LayoutComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
    const { Sider } = Layout;


    return (
        <Layout className="LayoutWrapper">
            <MainHeader {...props}/>
            <Layout>
                <Sider>
                    <SiderMenu config={routerConfig} {...props}/>
                </Sider>
                    <MainContent config={routerConfig} {...props}/>
            </Layout>
        </Layout>
    );
}
export default LayoutComponent
