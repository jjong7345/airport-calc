import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Image = styled.img`
	animation: ${spin} 2s infinite linear;
	width: 250px;
	image-rendering: auto;
	display: block;
    position: relative;
    top: 200px;
	margin: 0 auto;
`;

const Spinner = () => <Image src="/img/loader.png" alt="loading indicator" />;

export default Spinner;
