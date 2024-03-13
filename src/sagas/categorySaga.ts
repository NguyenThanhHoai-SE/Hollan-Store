import { Action } from "@/reducers/typings/Redux";
import { AxiosError, AxiosResponse } from "axios";
import { put, call } from "redux-saga/effects";
import { handleErrors } from "./handlers";
import { getAction } from "@/fadux";
import { APIType } from "@/services/typings/Api";

export function* getCategories(api: APIType, action: Action) {
  const { payload } = action;
  try {
    const response: AxiosResponse = yield call(api.getCategories, payload);
    yield put(getAction("getCategories", "succeed")({ response: response.data }));
  } catch (error: Error | AxiosError | any) {
    // Dispatch action to indicate failed data fetching
    yield* handleErrors({
      actionName: "getCategories",
      payload: payload,
      error: error,
    });
  }
}

