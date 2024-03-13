import { all, takeLatest } from 'redux-saga/effects';
import { getProductsByCategory, getProductDetail, getProducts } from './productSaga'; // Import your sagas
import api from "@/services/Api";
import { getActionName } from '@/fadux';
export default function* rootSaga() {
    yield all([
        takeLatest(getActionName('getProducts'), getProducts, api),
        takeLatest(getActionName('getProductDetail'), getProductDetail, api),
        takeLatest(getActionName('getProductsByCategory'), getProductsByCategory, api)
        // Add other sagas here
    ]);
}