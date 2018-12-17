import { combineReducers } from "redux";
import articles from './articles';
import favorites from './favorites';
import follow from './follow';
import settings from './settings';

export default combineReducers({
    articles,
    favorites,
    follow,
    settings,
});