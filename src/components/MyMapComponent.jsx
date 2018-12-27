import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, withProps, lifecycle } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	Polyline,
} from "react-google-maps";
import { MarkerWithLabel } from "react-google-maps/lib/components/addons/MarkerWithLabel";

const labelStyle = {
	backgroundColor: "#0071bc",
	color: "white",
	fontSize: "12px",
	padding: "5px 10px"
}

const MyMapComponent = compose(
	withProps({
		googleMapURL:
			"https://maps.googleapis.com/maps/api/js?key=AIzaSyCHAjmr-K-WQ1nPbiS9PyC3D3wpICR1h7g&v=3.exp&libraries=geometry,drawing,places",
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: (
			<div style={{ height: `600px`, padding: `0 0 50px` }} />
		),
		mapElement: <div style={{ height: `100%` }} />
	}),
	lifecycle({
		componentWillMount() {
			this.setState({
				map: null,
				center: {
					lat: 41.9,
					lng: -87.624
				},
				onMapMounted: ref => {
					this.setState({ map: ref });
				}
			});
		},
		componentDidUpdate(prevProps) {
			if (prevProps.distance !== this.props.distance) {
				// this.props.myProp has a different value
				// ...
				var LatLngList = new Array(
					new google.maps.LatLng(
						parseFloat(this.props.airportFrom.lat),
						parseFloat(this.props.airportFrom.lng)
					),
					new google.maps.LatLng(
						parseFloat(this.props.airportTo.lat),
						parseFloat(this.props.airportTo.lng)
					)
				);
				//  Create a new viewpoint bound
				var bounds = new google.maps.LatLngBounds();
				//  Go through each...
				for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
					//  And increase the bounds to take this point
					bounds.extend(LatLngList[i]);
				}
				//  Fit these bounds to the map
				this.state.map.fitBounds(bounds);
			}
		}
	}),
	withScriptjs,
	withGoogleMap
)(props => {
	let lat1 = parseFloat(props.airportFrom.lat);
	let lng1 = parseFloat(props.airportFrom.lng);
	let lat2 = parseFloat(props.airportTo.lat);
	let lng2 = parseFloat(props.airportTo.lng);

	let opacity = (props.airportFrom.lat)? 1:0;
	let opacity2 = (props.airportTo.lat)? 1:0;;

	return (
		<GoogleMap
			ref={props.onMapMounted}
			defaultZoom={4}
			defaultCenter={{ lat: 39, lng: -96 }}
		>
			<MarkerWithLabel
				position={{ lat: lat1, lng: lng1 }}
				labelAnchor={new google.maps.Point(0, 0)}
				labelStyle={{
					opacity: opacity,
					...labelStyle
				}}
			>
				<div>{props.airportFrom.iata}</div>
			</MarkerWithLabel>
			<MarkerWithLabel
				position={{ lat: lat2, lng: lng2 }}
				labelAnchor={new google.maps.Point(0, 0)}
				labelStyle={{
					opacity: opacity2,
					...labelStyle
				}}
			>
				<div>{props.airportTo.iata}</div>
			</MarkerWithLabel>

			<Polyline
				path={[{ lat: lat1, lng: lng1 }, { lat: lat2, lng: lng2 }]}
				options={{
					strokeColor: "#FF0000",
					strokeOpacity: 1.0,
					strokeWeight: 2
				}}
			/>
		</GoogleMap>
	);
});

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

export default connect(mapStateToProps, mapDispatchToProps)(MyMapComponent);
