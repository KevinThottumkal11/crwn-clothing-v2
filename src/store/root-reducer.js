import { combineReducers } from "redux";

import { UserReducer } from "./user/user.reducer";
import { categoriesReducer } from './categories/categories.reducer';

export const rootReducer = combineReducers({
    user: UserReducer,
    categories: categoriesReducer,
});