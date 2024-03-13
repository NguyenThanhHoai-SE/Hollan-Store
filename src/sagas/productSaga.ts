import { Action } from "@/reducers/typings/Redux";
import { AxiosError, AxiosResponse } from "axios";
import { put, call } from "redux-saga/effects";
import { handleErrors } from "./handlers";
import { getAction } from "@/fadux";
import { APIType } from "@/services/typings/Api";

export function* getProducts(api: APIType, action: Action) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(api.getProducts, payload);
    yield put(getAction("getProducts", "succeed")({ response: response.data }));
  } catch (error: Error | AxiosError | any) {
    // Dispatch action to indicate failed data fetching
    yield* handleErrors({
      actionName: "getProducts",
      payload: payload,
      error: error,
    });
  }
}

export function* getProductDetail(api: APIType, action: Action) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(api.getProductDetail, payload);
    yield put(getAction("getProductDetail", "succeed")({ response: response.data }));
  } catch (error: Error | AxiosError | any) {
    // Dispatch action to indicate failed data fetching
    yield* handleErrors({
      actionName: "getProductDetail",
      payload: payload,
      error: error,
    });
  }
}

export function* getProductsByCategory(api: APIType, action: Action) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(api.getProductsByCategory, payload);
    yield put(getAction("getProductsByCategory", "succeed")({ response: response.data }));
  } catch (error: Error | AxiosError | any) {
    // Dispatch action to indicate failed data fetching
    yield* handleErrors({
      actionName: "getProductsByCategory",
      payload: payload,
      error: error,
    });
  }
}
