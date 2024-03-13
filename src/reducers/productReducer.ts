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
      /*Product List*/
      getProducts: {
        payload: [],
      },
      getProductDetail: {
        payload: ["id"],
      },
      getProductsByCategory: {
        payload: ["category", "sort"],
      }
    }),
  },
  INITIAL_STATE
);
export { reducer };