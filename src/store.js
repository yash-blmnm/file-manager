import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import { folders } from './reducers'

const reducers = {
    folders
}
const rootReducer = combineReducers(reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const configureStore = () => createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk)),
    // applyMiddleware(thunk)
);