import React, { Component } from "react";
import { connect } from "react-redux";
import Autosuggest from "react-autosuggest";

import { setAirportFrom, setAirportTo } from "../actions";
import { escapeRegexCharacters } from "../utils/escapeRegexCharacters";

class AirportInputs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValue: "",
            nameSuggestions: []
        };
    }

    getSuggestions = value => {
        const escapedValue = escapeRegexCharacters(value.trim());

        let data = this.props.airportData;

        if (escapedValue === "") {
            return [];
        }

        const regex = new RegExp("^" + escapedValue, "i");

        return data.filter(data => regex.test(data.name) || regex.test(data.iata) || regex.test(data.city));
    };

    getSuggestionNickname = suggestion => suggestion.name;

    renderSuggestion = suggestion => <span>{suggestion.name} - {suggestion.iata}</span>

    onNameChange = (event, { newValue }) => {
        this.setState({
            nameValue: newValue
        });
    };

    onNameSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            nameSuggestions: this.getSuggestions(value)
        });
    };

    onNameSuggestionsClearRequested = () => {
        this.setState({
            nameSuggestions: []
        });
    };

    onNameSuggestionSelected = (event, { suggestion }) => {
        this.setState({
            nameValue: suggestion.name + " - " + suggestion.iata
        });
        this.props[this.props.type](suggestion)
    };

    render() {
        const {
            nameValue,
            nameSuggestions         
        } = this.state;
        const nameInputProps = {
            placeholder: "Enter a airport name or IATA",
            value: nameValue,
            onChange: this.onNameChange
        };

        return (
            <div className="container">
                <Autosuggest
                    suggestions={nameSuggestions}
                    onSuggestionsFetchRequested={
                        this.onNameSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                        this.onNameSuggestionsClearRequested
                    }
                    onSuggestionSelected={this.onNameSuggestionSelected}
                    getSuggestionValue={this.getSuggestionNickname.bind(this)}
                    renderSuggestion={this.renderSuggestion.bind(this)}
                    inputProps={nameInputProps}
                />             
            </div>
        );
    }
}

const mapStateToProps = state => ({ airportData: state.airportData });

const mapDispatchToProps = dispatch => ({
    setFrom(airport) {
        dispatch(setAirportFrom(airport));
    },
    setTo(airport) {
        dispatch(setAirportTo(airport));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AirportInputs);
