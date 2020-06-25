import React, { useCallback } from 'react';
import {Layout,Tooltip} from 'antd';
import {LogoutOutlined} from '@ant-design/icons';
import { History } from 'history'
import {useApolloClient} from "@apollo/react-hooks";


export interface ComponentProps {
    history:History,
}

const MainHeader: React.FC<ComponentProps> = (props: ComponentProps) => {

    const {Header} = Layout;
    const {history} = props;
    const client = useApolloClient();
    const handlelogout = useCallback(()=>{
        client.writeData({data:{isLogin:false}})
        history.push('/login')
    },[history,client])
    return (
        <Header className="Layout-Header">
            <div className="Layout-Header-left">
                个人博客后台
            </div>
            <div className="Layout-Header-right">
                <div className="user">Hi~</div>
                <Tooltip title="登出">
                    <LogoutOutlined className='logout-icon' onClick={handlelogout}/>
                </Tooltip>
            </div>
        </Header>
    )
}

export default MainHeader