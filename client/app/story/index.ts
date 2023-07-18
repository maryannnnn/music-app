import {createWrapper, MakeStore} from 'next-redux-wrapper';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {Reducers} from './reducers';
import { applyMiddleware, createStore, combineReducers, Store, AnyAction } from 'redux';

const rootReducer = combineReducers((
    Reducers
))

// Define the makeStore function
const makeStore: MakeStore<Store<RootState>> = () => {
    return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
};

export type RootState = ReturnType<typeof rootReducer>

// Define the NextThunkDispatch types
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

// Create the wrapper
const wrapper = createWrapper<Store<RootState>>(makeStore);

export const useWrappedStore = wrapper.useWrappedStore;

export default wrapper;

