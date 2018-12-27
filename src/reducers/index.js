import { combineReducers } from "redux";
import {
    SET_AIRPORT_FROM,
    SET_AIRPORT_TO,
    CAL_DISTANCE,
    ADD_AIRPORT_DATA
} from "../constants";

const airportFrom = (state = "", action) => {
    if (action.type === SET_AIRPORT_FROM) {
        return action.payload;
    }
    return state;
};

const airportTo = (state = "", action) => {
    if (action.type === SET_AIRPORT_TO) {
        return action.payload;
    }
    return state;
};

const distance = (state = "", action) => {
    if (action.type === CAL_DISTANCE) {
        return action.payload;
    }
    return state;
};

const airportData = (state = "", action) => {
    if (action.type === ADD_AIRPORT_DATA) {
        //return Object.assign({}, state, { [action.payload.imdbID]: action.payload });
        return action.payload;
    }
    return state;
};

const rootReducer = combineReducers({
    airportFrom,
    airportTo,
    distance,
    airportData
});

export default rootReducer;
