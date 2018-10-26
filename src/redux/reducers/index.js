import { combineReducers } from "redux";
import categories from './categories';
import articles from './articles';
import favorites from './favorites';
import follow from './follow';

export default combineReducers({
    categories,
    articles,
    favorites,
    follow,
});