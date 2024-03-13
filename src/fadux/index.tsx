import _, { has, isNil, lowerFirst, map, upperFirst } from "lodash";
import { createReducer } from "./ReducersCreator";
// import { FULL_EQUIPED_API_SAGA } from "./samples/saga";
import { camelToScreamingSnake } from "./Utils";
import { FULL_EQUIPED_API_ACTIONS } from "./sample/action";

let store: any = null;

export const setStore = (_store: any) => {
  store = _store;
}
/**
 * Instead of state && state.auth && state.auth.sample
 * You can rewrite getState(state,"auth","sample")
 * Two is equavilent
 * @param {Any} obj
 * @param  {...String} children
 */
const getState = (obj: any, ...children: any) => {
  if (isNil(obj)) return undefined;
  let result = obj;
  let isRunning = true;
  map(children, (child) => {
    if (has(result, child) && isRunning) {
      result = result[child];
    } else {
      isRunning = false;
      return;
    }
  });
  return isRunning ? result : undefined;
};

/**
 * Get action
 * @param {String} actionName
 * @param {String} tailedActionName
 */
const getAction = (actionName: string, tailedActionName?: string) => {
  return (payload?: any) => {
    return {
      type: camelToScreamingSnake(
        `${lowerFirst(actionName)}${upperFirst(tailedActionName || "")}`
      ),
      payload,
    };
  };
};

/**
 * Get action name: String
 * @param {String} actionName
 * @param {String} tailedActionName
 */
const getActionName = (actionName: string, tailedActionName?: string) => {
  return camelToScreamingSnake(
    `${lowerFirst(actionName)}${upperFirst(tailedActionName || "")}`
  );
};

/**
 * Call action
 * @param {Action} action - call getAction from lib/fadux anywhere
 */
const callAction = (action: any) => {
  store.dispatch(action);
};

/**
 * Call action
 * @param {Action} action - call getAction from lib/fadux anywhere
 */
const getPreviousAction = (reducerName: string, actionName: string) => {
  return getAction(actionName)(
    getState(getReduxStates(), reducerName, actionName, "previousPayload") || {}
  );
};

/**
 * Get state from redux anywhere
 */
const getReduxStates = () => {
  return store.getState();
};

// export const Samples = {
//   createFullEquippedAPIActions: FULL_EQUIPED_API_ACTIONS,
//   createFullEquippedAPISagas: FULL_EQUIPED_API_SAGA,
// };

const API = FULL_EQUIPED_API_ACTIONS;

export {
  createReducer,
  getAction,
  getActionName,
  getState,
  callAction,
  getPreviousAction,
  getReduxStates,
  API,
};
