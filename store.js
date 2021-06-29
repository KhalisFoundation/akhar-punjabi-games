import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./state";

const rootReducer = combineReducers({
  reducer,
});

const Store = createStore(rootReducer, applyMiddleware(thunk));

export default Store;
