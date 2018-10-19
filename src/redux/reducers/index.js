import { combineReducers } from "redux";
import categories from './categories';
import articles from './articles';

export default combineReducers({
    categories,
    articles,
});