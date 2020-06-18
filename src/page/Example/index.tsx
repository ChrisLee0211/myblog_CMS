import React from 'react';
import {connect} from 'react-redux';
import intl from 'react-intl-universal';
import './index.less'

export interface Iprops {
    
}

const translator: React.FC<Iprops> = (props: Iprops) => {

    return (
        <div>
            <div className="test">
                {intl.get('TEST')}
            </div>
        </div>
    )
}

export default translator