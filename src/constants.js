export const SET_APP_ID = 'SET_APP_ID';
export const SET_SINGLE_PAGE_APP = 'SET_SINGLE_PAGE_APP';
export const SET_FULLSCREEN = 'SET_FULLSCREEN';
export const SET_DIALOG_OPEN = 'SET_DIALOG_OPEN';
export const SET_APP_DIMS = 'SET_APP_DIMS';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const SET_DISPSELECT_DIALOG_OPEN = 'SET_DISPSELECT_DIALOG_OPEN';
export const SET_DISPINFO_DIALOG_OPEN = 'SET_DISPINFO_DIALOG_OPEN';

export const ACTIVE_SIDEBAR = 'ACTIVE_SIDEBAR';
export const SET_LAYOUT = 'SET_LAYOUT';
export const SET_LABELS = 'SET_LABELS';
export const SET_SORT = 'SET_SORT';
export const SET_FILTER = 'SET_FILTER';
export const SET_FILTER_VIEW = 'SET_FILTER_VIEW';
export const SELECT_DISPLAY = 'SELECT_DISPLAY';
export const REQUEST_DISPLAY = 'REQUEST_DISPLAY';
export const RECEIVE_DISPLAY = 'RECEIVE_DISPLAY';
export const REQUEST_DISPLAY_LIST = 'REQUEST_DISPLAY_LIST';
export const RECEIVE_DISPLAY_LIST = 'RECEIVE_DISPLAY_LIST';
export const REQUEST_COGDATA = 'REQUEST_COGDATA';
export const RECEIVE_COGDATA = 'RECEIVE_COGDATA';
export const SET_PANEL_RENDERER = 'SET_PANEL_RENDERER';
export const WINDOW_RESIZE = 'WINDOW_RESIZE';
export const UPDATE_DIMS = 'UPDATE_DIMS';
export const REQUEST_CONFIG = 'REQUEST_CONFIG';
export const RECEIVE_CONFIG = 'RECEIVE_CONFIG';
export const SET_LOCAL_PANELS = 'SET_LOCAL_PANELS';
export const SET_SELECTED_RELDISPS = 'SET_SELECTED_RELDISPS';
export const SET_REL_DISP_POSITIONS = 'SET_REL_DISP_POSITIONS';
// export const SET_SELECTED_VIEW = 'SET_SELECTED_VIEW';
export const SET_TABLE = 'SET_TABLE';

export const SB_PANEL_LAYOUT = 'Panel Grid Layout';
export const SB_PANEL_FILTER = 'Filter Panels';
export const SB_PANEL_SORT = 'Sort Panels';
export const SB_PANEL_LABELS = 'Show/Hide Labels';
export const SB_VIEWS = 'Views';
export const SB_CONFIG = 'Configuration';

export const SB_LOOKUP = [
  SB_PANEL_LAYOUT, SB_PANEL_FILTER, SB_PANEL_SORT, SB_PANEL_LABELS, SB_VIEWS
];
export const SB_REV_LOOKUP = {};
SB_LOOKUP.forEach((d, i) => { SB_REV_LOOKUP[d] = i; });
SB_REV_LOOKUP[''] = -1;
