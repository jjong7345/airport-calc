import axios from "axios";
import {
    SET_AIRPORT_FROM,
    SET_AIRPORT_TO,
    CAL_DISTANCE,
    ADD_AIRPORT_DATA
} from "../constants";

export function setAirportFrom(airport_from) {
    return { type: SET_AIRPORT_FROM, payload: airport_from };
}

export function setAirportTo(airport_to) {
    return { type: SET_AIRPORT_TO, payload: airport_to };
}

export function calDistance(distance) {
    return { type: CAL_DISTANCE, payload: distance };
}


export function addAirPortData(ariportData) {
    return { type: ADD_AIRPORT_DATA, payload: ariportData };
}

export function getAirPortData() {
    return dispatch => {
        axios
            .get(`/data/us_airports.json`)
            .then(response => {
                dispatch(addAirPortData(response.data));
            })
            .catch(error => {
                console.log("axios error", error);
            });
    };
}
