import { getStatusBarHeight, getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper'

// Fix spaces on iphone
export const SPACE_TOP = getStatusBarHeight()
export const SPACE_BOTTOM = getBottomSpace()
export const IS_IPHONE_X = isIphoneX()
// END Fix spaces on iphone

export const FONT_SIZE = 17;
export const INTENT = 16;
export const RADIUS = 8;
export const MARGIN = 20;
export const PADDING = INTENT - 4;

export const FIELD_HEIGHT = 50;

const COLOR_RED = '#ce2b5a';
const COLOR_BLACK = '#000000';
const COLOR_GREY = '#a1a1a1';
const COLOR_GREY_MIDDLE = '#ababab';
const COLOR_GREY_LIGHT = '#f0f0f0';
const COLOR_GREY_LIGHTER = '#d4d4d4';
const COLOR_WHITE = '#ffffff';
const COLOR_BROWN_LIGHT = '#c7b0b7';
const COLOR_BROWN_LIGHT_OPACITY = 'rgba(206, 43, 90, 0.06)';


export const COLOR_1 = COLOR_WHITE;
export const COLOR_2 = COLOR_BLACK;
export const COLOR_3 = COLOR_RED;
export const COLOR_4 = COLOR_GREY;
export const COLOR_5 = COLOR_GREY_LIGHT;
export const COLOR_6 = COLOR_BROWN_LIGHT;
export const COLOR_7 = COLOR_GREY_MIDDLE;
export const COLOR_8 = COLOR_GREY_LIGHTER;
export const COLOR_9 = COLOR_BROWN_LIGHT_OPACITY;

