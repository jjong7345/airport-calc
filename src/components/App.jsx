import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { getAirPortData, calDistance } from "../actions";
import Spinner from "./Spinner";
import AirportInputs from "./AirportInputs";
import MyMapComponent from "./MyMapComponent";
import Header from "./Header";
import DistanceDisplay from "./DistanceDisplay";
import { calcDistance } from "../utils/calcDistance";
import { H_Box, H_Box_Center} from "../style.js";

const Input_Container = styled.div`
	width: 48%;
	color: #fff;
	font-size: 20px;
	margin-top: 50px;
`;

const Button = styled.button`
	width: 200px;
	height: 50px;
	font-size: 16px;
	background: #0071bc;
	border-radius: 4px;
	border: none;
	color: white;
	outline: none;

	&:hover {
		background: #025790;
	}
`;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			distance: 0
		};
	}

	componentDidMount() {
		this.props.getAPData();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.distance !== this.props.distance) {
			this.test(this.props.distance);
		}
	}

	calcDistance = event => {
		const lat1 = parseFloat(this.props.airportFrom.lat);
		const lng1 = parseFloat(this.props.airportFrom.lng);
		const lat2 = parseFloat(this.props.airportTo.lat);
		const lng2 = parseFloat(this.props.airportTo.lng);
		if (lat1 && lat2) {
			this.props.calculatedDistance(calcDistance(lat1, lng1, lat2, lng2));
		}
	};

	test = distance => {
		this.setState({ distance: 0 });
		let interval;
		interval = setInterval(() => {
			if (this.state.distance < this.props.distance) {
				this.setState({ distance: this.state.distance + 10 });
			} else {
				clearInterval(interval);
			}
		}, 2);
	};

	render() {
		let content;
		if (this.props.airportData) {
			content = (
				<div>
					<H_Box>
						<Input_Container>
							<div className="field-title">
								Airport From: {this.props.airportFrom.city}
							</div>
							<AirportInputs type="setFrom" />
						</Input_Container>
						<Input_Container>
							<div className="field-title">
								Airport To: {this.props.airportTo.city}
							</div>
							<AirportInputs type="setTo" />
						</Input_Container>
					</H_Box>
					<H_Box_Center>
						<Button onClick={this.calcDistance}>
							<span>Calculate Distance</span>
						</Button>
					</H_Box_Center>
					<DistanceDisplay />
					<div>
						<MyMapComponent />
					</div>
				</div>
			);
		} else {
			content = <Spinner />;
		}

		return (
			<div>
				<Header />
				<div className="content">{content}</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	airportData: state.airportData,
	airportFrom: state.airportFrom,
	airportTo: state.airportTo,
	distance: state.distance
});

const mapDispatchToProps = dispatch => ({
	getAPData() {
		dispatch(getAirPortData());
	},
	calculatedDistance(distance) {
		dispatch(calDistance(distance));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
