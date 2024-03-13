import { createActions, createReducer as RSCreateReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { camelToScreamingSnake } from './Utils';
import { Reducer } from 'react';
import { AnyAction } from 'redux';
import { forOwn, map, upperFirst } from 'lodash';

interface Data {
  initialStates?: any;
  [x: string]: Redux;
}

interface Redux {
  action: (state: Immutable.ImmutableObject<any>, { payload }: any) => any;
  payload: any;
  tailedActions?: any;
}

/**
 * Automatically create reducer in the shorted way
 * @param {*} data
 * @param {*} initialStates
 */
export const createReducer = (data: Data, initialStates: Object = {}): Reducer<any, AnyAction> => {
  let payloads: any = {};
  map(data, function (v: Redux, k) {
    payloads[k] = v.payload || null;
    forOwn(v.tailedActions || {}, function (value, key) {
      payloads[`${k}${upperFirst(key)}`] = value.payload || null;
    });
  });

  const { Types } = createActions(payloads);
  let actions: any = {};
  map(data, function (v: Redux, k) {
    actions[Types[camelToScreamingSnake(k)]] = v.action;
    // action tails
    forOwn(v.tailedActions || {}, function (value, key) {
      const TAILED_TYPES_NAME = camelToScreamingSnake(`${k}${upperFirst(key)}`);
      actions[Types[TAILED_TYPES_NAME]] = value.action;
    });
  });

  return RSCreateReducer(Immutable(data.initialStates || initialStates || {}), actions);
};
