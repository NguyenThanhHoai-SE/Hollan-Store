import { API, createReducer } from "@/fadux";
import _ from "lodash";
/**
 * Initital state
 */

const INITIAL_STATE = {};
/**
 * Create Authentication reducer
 */

const reducer = createReducer(
  {
    ...API({
      /*category List*/
      getCategories: {
        payload: [],
      },
    }),
  },
  INITIAL_STATE
);
export { reducer };