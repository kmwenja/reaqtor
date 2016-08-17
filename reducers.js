import { combineReducers } from "redux";

const status = (state={}, action) => {
    switch(action.type) {
        case 'UPDATE_STATUS':
            return action.data
        default:
            return state
    }
}

const playlist = (state=[], action) => {
    switch(action.type) {
        case 'UPDATE_PLAYLIST':
            return action.data
        default:
            return state
    }
    return state;
}

const browser = (state={current: '/', previous: null, files: []}, action) => {
    switch(action.type) {
        case 'UPDATE_BROWSER':
            return action.data
        default:
            return state
    }
}

const AppReducers = combineReducers({status, playlist, browser});

export default AppReducers;
