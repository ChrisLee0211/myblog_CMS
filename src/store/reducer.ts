import {combineReducers} from 'redux';
import example from '../page/Example/store/reducers'


const reducer = combineReducers({
    example}
);

export default reducer
export type RootState = ReturnType<typeof reducer>