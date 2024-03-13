import { AnyAction, combineReducers, Reducer } from "redux";

const rootReducer = combineReducers({
    // Add your reducers here
    product: require("./productReducer").reducer as Reducer<any, AnyAction>,
    category: require("./categoryReducer").reducer as Reducer<any, AnyAction>,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;