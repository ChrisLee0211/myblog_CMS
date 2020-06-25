import React,{useState, useCallback} from 'react';
import CommonInput from '../../../components/commonInput/index';
import {Button,message} from 'antd';
import {History} from 'history'
import { useApolloClient } from "@apollo/react-hooks";

export interface ComponentProps {
    history:History,
}



const LoginForm: React.FC<ComponentProps> = (props: ComponentProps) => {

    const {history}  = props;

    const [UserName,setUserName] = useState('');
    const [Password,setPassword] = useState('');
    const [formLoading, setFormLoading] = useState(false);
    const client = useApolloClient();
    //登陆逻辑
    const clickToLogin:()=>void = useCallback(()=>{
        setFormLoading(true)
        if(UserName.length<1||Password.length<1){
            message.error('请输入用户名与密码');
            return
        }
        client.writeData({data:{isLogin:true}})
        history.push('/');
    },[UserName, Password, history])
    
    /**
     * 监听回车触发表单提交
     * @param val 键盘码
     * @author chrislee
     * @Time 2020/3/5
     */
    const sumbitByEnter:(val:number) =>void = (val) => {
        if(val === 13){
            clickToLogin()
        }
    }
    return (
        <div className="login-form">
            <div className="login-form-content">
                <div className="login-form-content-title">登陆</div>
                <div className="login-form-content-inputWrap">
                    <CommonInput
                        width={'220px'}
                        height={'35px'}
                        type="input"
                        tips="用户"
                        change={(val)=>setUserName(val)}
                        keyUp={(val=>sumbitByEnter(val))}
                    />
                </div>
                <div className="login-form-content-inputWrap">
                    <CommonInput
                        width={'220px'}
                        height={'35px'}
                        type="password"
                        tips="密码"
                        change={(val)=>setPassword(val)}
                        keyUp={(val=>sumbitByEnter(val))}
                    />
                </div>
                <div className="login-form-content-button">
                    <div className="login-form-content-button-wrap">
                        <Button 
                            type="primary" 
                            loading={formLoading}
                            onClick={clickToLogin}
                            block
                            >登录</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginForm