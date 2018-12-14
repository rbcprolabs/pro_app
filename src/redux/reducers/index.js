import { combineReducers } from "redux";
import articles from './articles';
import favorites from './favorites';
import follow from './follow';

export default combineReducers({
    articles,
    favorites,
    follow,
});