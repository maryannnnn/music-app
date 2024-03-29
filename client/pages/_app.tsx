import React, {FC} from 'react';
import {Provider} from 'react-redux';
import {AppProps} from 'next/app';
import {wrapper} from "../app/story";

const WrappedApp: FC<AppProps> = ({Component, ...rest}) => {
    const {store, props} = wrapper.useWrappedStore(rest);
    const {pageProps} = props;
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
};

export default WrappedApp;