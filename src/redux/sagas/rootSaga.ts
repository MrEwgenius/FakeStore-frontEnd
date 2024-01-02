import { all } from 'redux-saga/effects'

import productSagaWatcher from './productSaga'




export default function* rootSaga() {

    yield all([productSagaWatcher()])


}