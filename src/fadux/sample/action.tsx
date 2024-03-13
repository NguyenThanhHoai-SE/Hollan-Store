import { forOwn, isFunction } from "lodash";
import { FaduxAction } from "../typings/Action";

const FULL_EQUIPED_API_ACTIONS = (actions: { [x: string]: FaduxAction }) => {
  const obj: any = {};
  forOwn(actions || {}, function (value, key) {
    let uniqueKey = key;
    obj[uniqueKey] = {
      // initial States
      initialStates: {
        [uniqueKey]: {
          [`isLoading`]: false,
          [`isTimeout`]: false,
          [`isError`]: false,
          [`isNetworkError`]: false,
        },
      },
      payload: value.payload,
      // All your action
      action: (state: any, { payload }: any) => {
        return state.merge({
          [`isLoading`]: true,
          [uniqueKey]: {
            ...(state[uniqueKey] || {}),
            [`isLoading`]: true,
            [`isTimeout`]: false,
            [`isError`]: false,
            [`isNetworkError`]: false,
            [`previousPayload`]: payload,
          },
        });
      },
      // Tailed actions
      tailedActions: {
        // connectSampleSucceed
        succeed: {
          payload: ["response"],
          action: (state: any, { payload }: any) => {
            state = state.merge({
              [`isLoading`]: false,
              [uniqueKey]: {
                ...(state[uniqueKey] || {}),
                [`res`]: payload.response,
                [`isLoading`]: false,
                [`isTimeout`]: false,
                [`isError`]: false,
                [`isNetworkError`]: false,
              },
            });
            // Custom succeed action
            if (isFunction(value.succeed)) {
              state = state.merge(value.succeed(state, payload.response));
            }
            // Automatically merging
            return state;
          },
        },
        // connectSampleFailed
        failed: {
          payload: ["error"],
          action: (state: any, { payload }: any) => {
            // Custom error action
            if (isFunction(value.failed)) {
              state = state.merge(value.failed(state, payload.error));
            }
            // Automatically merging
            return state.merge({
              [`isLoading`]: false,
              [uniqueKey]: {
                ...(state[uniqueKey] || {}),
                [`isLoading`]: false,
                [`isTimeout`]: false,
                [`isError`]: true,
                [`isNetworkError`]: false,
                [`error`]: payload.error,
              },
            });
          },
        },
        // connectSampleReset
        reset: {
          payload: [],
          action: (state: any, { payload }: any) => {
            // Automatically merging
            return state.merge({
              [`isLoading`]: false,
              [uniqueKey]: {},
            });
          },
        },
        // connectSampleTimeout
        timeout: {
          payload: null,
          action: (state: any, { payload }: any) => {
            // Custom timeout action
            if (isFunction(value.timeout)) {
              state = state.merge(value.timeout(state));
            }
            // Automatically merging
            return state.merge({
              [`isLoading`]: false,
              [uniqueKey]: {
                ...(state[uniqueKey] || {}),
                [`isLoading`]: false,
                [`isTimeout`]: true,
                [`isError`]: true,
                [`isNetworkError`]: false,
              },
            });
          },
        },
        // connectSampleNetworkError
        networkError: {
          payload: null,
          action: (state: any, { payload }: any) => {
            // Custom networkError action
            if (isFunction(value.networkError)) {
              state = state.merge(value.networkError(state));
            }
            // Automatically merging
            return state.merge({
              [`isLoading`]: false,
              [uniqueKey]: {
                ...(state[uniqueKey] || {}),
                [`isLoading`]: false,
                [`isTimeout`]: false,
                [`isError`]: true,
                [`isNetworkError`]: true,
              },
            });
          },
        },
      },
    };
  });
  return obj;
};

export { FULL_EQUIPED_API_ACTIONS };
