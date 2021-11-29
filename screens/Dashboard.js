import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	StatusBar,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	PermissionsAndroid,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import DashBoardCard from '../Component/DashBoardCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAllMaterial, updateDeviceToken } from '../Api/api';
import SideBar from '../Component/SideBar';
import EditProfile from '../Component/EditProfile';

import { Notifications } from 'react-native-notifications';
import Geolocation from 'react-native-geolocation-service';
import {
	saveLoginLocation,
	updatePickupAlertModal,
} from '../Redux/actionCreator';
import NewPickup from '../Component/NewPickup';
import NewMessage from '../Component/NewMessage';
import { store } from '../Redux/store';

const mapStateToProps = (state) => {
	return {
		userData: state.normal.userData,
		materialLoaded: state.normal.materialLoaded,
		pushToken: state.normal.devicePushToken,
	};
};

const mapDispatchToProps = (dispatch) => {
	console.log('her');
	return {
		saveLoginLocation: (obj) => {
			dispatch(saveLoginLocation(obj));
		},
	};
};

const DashBoard = (props) => {
	const [showSideBar, setShowSideBar] = useState(false);
	const [showEditProfileModal, setShowEditProfileModal] = useState(false);

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
					props.saveLoginLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});

					console.log('My current location', {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
				},
				(error) => {
					// See error code charts below.
					console.log(error.code, error.message);
				},
				{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
			);
		}
	};

	const handlSideBar = () => {
		setShowSideBar(!showSideBar);
	};

	useEffect(() => {
		getAllMaterial();
		console.log(props.pushToken);
		// updateDeviceToken(props.pushToken);
		//  getCurrentLocation();
	}, []);
	return (
		<ImageBackground
			source={require('../assets/background/bg2.jpg')}
			style={{ height: '100%', width: '100%' }}
		>
			<SideBar
				showSideBar={showSideBar}
				handleModalBackButton={() => {
					handlSideBar();
				}}
				showEditProfileModal={() => {
					setShowSideBar(false);
					setShowEditProfileModal(true);
				}}
			/>
			<EditProfile
				showEditProfileModal={showEditProfileModal}
				// userData={userData}
				handleModalBackButton={() => {
					setShowEditProfileModal(false);
				}}
			/>

			<StatusBar backgroundColor='#EF7700' barStyle='light-content' />
			<Animatable.View
				animation='zoomInDown'
				duration={3000}
				style={{ flex: 1 }}
			>
				<View style={styles.headers}>
					<Text
						style={[
							styles.dashBoardText,
							{ alignSelf: 'center', bottom: 0, fontSize: 18 },
						]}
					>
						Dashboard
					</Text>
					<View style={styles.headersLogo}>
						<TouchableOpacity
							onPress={() => {
								props.navigation.navigate('Message');
							}}
						>
							<MaterialCommunityIcons
								style={{ top: 30, marginRight: 10 }}
								name='message-text-outline'
								color='#6F6F6F'
								size={25}
							/>
						</TouchableOpacity>

						{props.userData.avatar_image ? (
							<Image
								source={{
									uri:
										'https://api.scrapays.com/storage/profile_pictures/' +
										props.userData.avatar_image,
								}}
								style={{ width: 90, height: 90, borderRadius: 45 }}
							/>
						) : (
							<Image
								source={require('../assets/avatar.png')}
								style={{ width: 90, height: 90, borderRadius: 45 }}
							/>
						)}

						<TouchableOpacity
							onPress={() => {
								handlSideBar();
							}}
						>
							<MaterialCommunityIcons
								style={{ top: 30 }}
								name='dots-vertical'
								color='#6F6F6F'
								size={30}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<Text style={[styles.dashBoardText, { marginLeft: 20 }]}>Hello,</Text>
				<Text
					style={[
						styles.dashBoardText,
						{ marginLeft: 20, marginBottom: 20, textTransform: 'capitalize' },
					]}
				>
					{props.userData.first_name} {props.userData.last_name}
				</Text>
				<ScrollView>
					<View style={styles.sectionContainer}>
						<DashBoardCard
							tab={true}
							screenName={'Pickup'}
							icon={require('../assets/bell.png')}
							text='New pickup request'
						/>
						<DashBoardCard
							screenName={'CollectionLog'}
							icon={require('../assets/dumpster.png')}
							text='Collection log'
						/>
					</View>
					<View style={styles.sectionContainer}>
						<DashBoardCard
							tab={true}
							screenName={'CollectionHistory'}
							icon={require('../assets/dumpsterHistory.png')}
							text='Collection History'
						/>
						<DashBoardCard
							tab={true}
							screenName={'Wallet'}
							icon={require('../assets/wallet.png')}
							text='Wallet'
						/>
					</View>
					<View style={styles.sectionContainer}>
						<DashBoardCard
							screenName={'CompositePrice'}
							icon={require('../assets/fridge.png')}
							text='Household Material Price List'
						/>
						<DashBoardCard
							screenName={'SearchAgent'}
							icon={require('../assets/searching.png')}
							text='Search Agent'
						/>
					</View>
					<View style={styles.sectionContainer}>
						<DashBoardCard
							screenName={'BulkOfTake'}
							icon={require('../assets/request.png')}
							text=' Bulk Request Offtake'
						/>

						<DashBoardCard
							screenName={'ConfirmTonnageByAgent'}
							icon={require('../assets/purse.png')}
							text='Pending Payment'
						/>
					</View>

					{/* <DashBoardCard
              screenName={"Pickup"}
              tab={true}
              icon={require("../assets/schedule.png")}
              text="Scheduled Pickup"
            /> */}
				</ScrollView>
				{/* <NewPickup /> */}
				{/* <NewMessage /> */}
			</Animatable.View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	headers: {
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: StatusBar.currentHeight + 20,
	},
	headersLogo: { flexDirection: 'row' },
	dashBoardText: {
		fontWeight: 'bold',
		fontSize: 24,
		position: 'relative',
		bottom: 10,
	},
	sectionContainer: {
		paddingHorizontal: 30,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
