import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";

import { H_Box_Center } from "../style.js";

const airplane = styled.img``;

const Airplane = styled.img`
	width: 50px;
`;

const IATA = styled.div`
	width: 80px;
	color: white;
	font-size: 20px;
	line-height: 40px;
	font-weight: bold;
`;

const TravelContainer = styled.div`
	width: 500px;
	position: relative;
	height: 40px;
	color: white;
	text-align: center;
`;

const Miles = styled.div`
	color: white;
	font-size: 30px;
	text-align: center;
	font-weight: bold;
`;

const airplane_style = {
	position: "absolute",
	left: "0",
	top: "0"
};

const path_style = {
	position: "absolute",
	left: "0",
	top: "19px",
	height: "2px",
	background: "white"
};

class DistanceDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			distance: 0,
			left: 0,
			pathWidth: 0
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.distance !== this.props.distance) {
			// this.props.myProp has a different value
			// ...
			this.animateDistance(this.props.distance);
		}
	}

	animateDistance = distance => {
		//reset states
		this.setState({ distance: 0, left: 0 });
		const length = 430;
		const distanceSteps = 5;
		let animationSteps = length * distanceSteps / Math.ceil(this.props.distance);
		let interval;
		interval = setInterval(() => {
			if (this.state.distance < this.props.distance) {
				this.setState({
					distance: this.state.distance + distanceSteps,
					left: this.state.left + animationSteps,
					pathWidth: this.state.left + animationSteps
				});
			} else {
				clearInterval(interval);
			}
		}, 2);
	};

	render() {
		return (
			<div>
				<H_Box_Center>
					<IATA>{this.props.airportFrom.iata || "FROM"}</IATA>
					<TravelContainer>
						<div
							style={{ ...airplane_style, left: this.state.left }}
						>
							<Airplane
								src="/img/airplane-2.png"
								alt="loading indicator"
							/>
						</div>
						<div
							style={{
								...path_style,
								width: this.state.pathWidth
							}}
						/>
					</TravelContainer>
					<IATA>{this.props.airportTo.iata || "TO"}</IATA>
				</H_Box_Center>
				<H_Box_Center>
					<Miles>
						{this.state.distance} <br /> nautical miles
					</Miles>
				</H_Box_Center>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	distance: state.distance,
	airportFrom: state.airportFrom,
	airportTo: state.airportTo
});

export default connect(mapStateToProps)(DistanceDisplay);
