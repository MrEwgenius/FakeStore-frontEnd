import { all } from "redux-saga/effects";

import productSagaWatcher from "./productSaga";
import authSagaWatcher from "./authSaga";

export default function* rootSaga() {
    yield all([productSagaWatcher(), authSagaWatcher()]);
}
