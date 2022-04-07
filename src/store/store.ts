import {applyMiddleware, combineReducers, createStore} from 'redux';
import {productReducer} from '../reducers/products-reducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    product: productReducer
})
export const store = createStore(rootReducer, applyMiddleware(thunk))
export type RootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store
