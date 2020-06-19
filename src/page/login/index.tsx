import React, { useMemo } from 'react';
import LoginForm from './components/LoginForm';
import './index.scss'
import {History} from 'history'
import {bindActionCreators, Dispatch} from 'redux';
import {connect} from 'react-redux'

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