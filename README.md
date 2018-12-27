# minimal-react-redux-setup

[![Build Status](https://travis-ci.org/rwieruch/minimal-react-webpack-babel-setup.svg?branch=master)](https://travis-ci.org/rwieruch/minimal-react-webpack-babel-setup)

Adapted from the [The Minimal React Redux Setup](https://www.robinwieruch.de/minimal-react-webpack-babel-setup/)


# US Airport Distance Calculator
US Airport Distance Calculator is a web app built with Reac/Redux that allows you to search for airports in the United States and calculates the distance between them in nautical miles. The airports will also be placed as markers on a Google map, displaying the geodesic path between them.
* Name: Jong Suk Park
* Email: jjong7345@gmail.com

## Installation

* npm install
* npm start
* visit `http://localhost:8080/`

## Technical Details

### Autocompleting Input Fields

#### Components

Due to the dynamic nature of the autocompleting field, I elected to use React.js to build the autocompleting search fields. The top level
component `App.jsx` is a functional component containing the entire application. The autocomplete input component `AirportInputs.jsx` uses `react-autosuggest` package.

#### Data

I am using a hardcoded 	`us_airports.json` file as a data source. I am fetching this local data using `axio` and `redux-thunk` to mimic http-request data fetching from server. 

### Distance and Map

Upon selecting two airports, the distance between the airports is calculated using the [Haversine formula](https://en.wikipedia.org/wiki/Haversine_formula) (`calcDistance.js`). The airports are then placed on the map using `react-google-maps` as markers, a geodesic polyline is drawn between them. The distance in nautical miles is being animated counting up from 0. Also airplane flying animation is added to give a visual timing tip based on the distance (longer distance outputs longer flying animation)  
