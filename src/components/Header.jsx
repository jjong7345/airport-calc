import React, { Component } from "react";
import styled, { keyframes } from "styled-components";

const HeaderBar = styled.div`
	width: 100%;
	height: 70px;
	background-color: #ffffff;
`;

const Title = styled.div`
	color: #0071bc;
	font-weight: bold;
	font-size: 30px;
	line-height: 30px;
	padding: 20px;
`;

class Header extends Component {
	render() {
		return (
			<HeaderBar>
				<Title>US Airport Distance Calculator</Title>
			</HeaderBar>
		);
	}
}

export default Header;
