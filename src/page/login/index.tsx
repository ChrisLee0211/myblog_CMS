import React, { useMemo } from 'react';
import LoginForm from './components/LoginForm';
import './index.scss'
import {History} from 'history'


export interface ComponentProps {
    history:History,
}

const Login: React.FC<ComponentProps> = (props: ComponentProps) => {

    return (
        <div className="login-wrap">
            <LoginForm history={props.history} />
        </div>
    )
}
  
export default Login