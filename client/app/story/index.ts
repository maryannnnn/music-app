import {Context, createWrapper, HYDRATE, MakeStore} from 'next-redux-wrapper';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {ThunkDispatch} from "@types/redux-thunk";
import {Reducers} from './reducers';
import { applyMiddleware, createStore, combineReducers, Store, AnyAction } from 'redux';

const rootReducer = combineReducers((
    Reducers
))

// Define the makeStore function
const makeStore: MakeStore<RootState>
    = (context: Context) => createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof rootReducer>

// Define the NextThunkDispatch types
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;

// Create the wrapper
//export const wrapper = createWrapper<Store<RootState>>(makeStore);
export const wrapper = createWrapper<RootState>(makeStore, {debug: true});

export const useWrappedStore = wrapper.useWrappedStore;

export const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        if (state.count) nextState.count = state.count // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducer(state, action)
    }
}

