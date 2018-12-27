import styled, { css } from "styled-components";

export const h_box_base = css`
	flex-flow: row nowrap;
	flex: 0 0 auto;
	justify-content: space-between;
	align-items: stretch;
	display: flex;
	padding: 20px 0;
`;

export const H_Box = styled.div`
	${h_box_base};
`;

export const H_Box_Center = styled.div`
	${h_box_base} 
	justify-content: center;
`;
