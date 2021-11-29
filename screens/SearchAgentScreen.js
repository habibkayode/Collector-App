import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Image,
	PermissionsAndroid,
	FlatList,
	Dimensions,
} from 'react-native';

import MapView, { Marker, Callout } from 'react-native-maps';
import { gettAllAgent } from '../Api/api';
import { connect } from 'react-redux';
import Bgcover from '../Component/Bg/BackgroundCover';
import Geolocation from 'react-native-geolocation-service';
import AgentCard from '../Component/AgentCard';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBxdQWCyWmxbf3O65eaOzb2XXoCT4lpgIs';
const mapStateToProps = (state) => {
	return {
		agents: state.normal.agents,
		userLocation: state.location.coordinate,
	};
};

let agentCardWidth = Dimensions.get('screen').width * 0.8;
const SearchAgentScreen = ({ navigation, agents, userLocation }) => {
	let [startingLocation, setStartingLocation] = useState();
	let [loading, setLoading] = useState(true);
	let [selectedIndex, setSelectIndex] = useState(0);
	let [scrollX, setScrollX] = useState(0);

	let agentsRef = useRef();
	let mapRef = useRef();

	let getCurrentLocation = async () => {
		let granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Scrapays Location Permission',
				message: 'Scrapays App needs access to your location ',
			}
		);
		if (granted) {
			Geolocation.getCurrentPosition(
				(position) => {
					setStartingLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
					console.log('My current location', JSON.stringify(position));
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		}
	};

	useEffect(() => {
		gettAllAgent().then(() => {
			setLoading(false);
		});
		getCurrentLocation();
	}, []);

	const redirectFunc = () => {
		navigation.navigate('ConfirmationPage');
	};
	return (
		<Bgcover name=' Search for Agent'>
			{!loading && startingLocation && (
				<>
					<View style={{ marginBottom: 0, flex: 1 }}>
						<MapView
							ref={(r) => {
								mapRef.current = r;
							}}
							showsUserLocation
							showsMyLocationButton
							loadingEnabled
							loadingIndicatorColor='#F18921'
							toolbarEnabled
							showsPointsOfInterest={false}
							style={{ height: '100%' }}
							initialRegion={{
								latitude: startingLocation.latitude,
								longitude: startingLocation.longitude,
								latitudeDelta: 0.0922,
								longitudeDelta: 0.0421,
							}}
						>
							{/* <Marker
								coordinate={{
									latitude: parseFloat(userLocation.lat),
									longitude: parseFloat(userLocation.lng),
								}}
							>
								<Image
									style={{ width: 30, height: 30 }}
									source={require('../assets/srapays-logo.png')}
								></Image>
							</Marker> */}
							{/* <Marker
                coordinate={{
                  latitude: parseFloat(userLocation.lat),
                  longitude: parseFloat(userLocation.lng),
                }}
              >
                <MaterialCommunityIcons name="cart" color="blue" size={30} />
                <Callout>
                  <Text
                    style={{
                      width: 100,
                      height: 30,
                      fontSize: 15,
                      fontWeight: "bold",
                    }}
                  >
                    My Location
                  </Text>
                </Callout>
              </Marker> */}
							{agents.map((i, index) => {
								return (
									<Marker
										onPress={() => {
											console.log(index, 'message');
											agentsRef.current.scrollToIndex({
												animated: true,
												index,
											});
											setSelectIndex(index);
										}}
										key={index}
										title={` ${i.first_name} ${i.last_name} `}
										coordinate={{
											latitude: parseFloat(i.userable.coordinates.lat),
											longitude: parseFloat(i.userable.coordinates.lng),
										}}
										// image={require('../assets/marker2.png')}
										style={{ width: 100, height: 100 }}
									>
										{scrollX >= index * agentCardWidth &&
										scrollX < (index + 1) * agentCardWidth ? (
											<Image
												style={{ width: 70, height: 70, resizeMode: 'contain' }}
												source={require('../assets/scrapays_marker.png')}
											></Image>
										) : (
											<Image
												style={{
													width: 50,
													height: 50,
													resizeMode: 'contain',
												}}
												source={require('../assets/scrapays_marker_green.png')}
											></Image>
										)}
									</Marker>
								);
							})}
						</MapView>
					</View>
					<View style={{ position: 'absolute', bottom: 0 }}>
						<FlatList
							ref={agentsRef}
							horizontal={true}
							data={agents}
							contentContainerStyle={{ paddingHorizontal: 20 }}
							onScroll={(event) => {
								console.log(event.nativeEvent.contentOffset);
								setScrollX(event.nativeEvent.contentOffset.x);
							}}
							getItemLayout={(data, index) => ({
								length: agentCardWidth,
								offset: agentCardWidth * index,
								index,
							})}
							ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
							keyExtractor={(item, index) => index}
							renderItem={({ item, index }) => {
								return <AgentCard data={item} index={index} mapRef={mapRef} />;
							}}
						/>
					</View>
				</>
			)}
		</Bgcover>
	);
};

export default connect(mapStateToProps)(SearchAgentScreen);
