import {  configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga';
import productReducer from './reducers/productSlice';


const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        productReducer,
    },
    middleware: [sagaMiddleware]

})
sagaMiddleware.run(rootSaga)

export type Rootstate = ReturnType<typeof store.getState>

export default store;