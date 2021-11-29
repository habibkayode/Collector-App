import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	StatusBar,
	ImageBackground,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Picker, Header, Button, Title } from 'native-base';
import RNPickerSelect from 'react-native-picker-select';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import BluetoothModal from '../Component/Bluetooth/BluetoothModal';
import * as BLEapi from '../Api/bluetoothApi';
import CompositeModal_NEW from '../Component/CompositeModal_NEW';
import HomogeneousModal from '../Component/AddHomogenousModal';
import Bgcover from '../Component/Bg/BackgroundCover';
import { useRoute } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddComposite from '../Component/AddCompositeModal';
import { numberWithCommas } from '../helper/helper';

const defaultMaterial = {
	materialType: '',
	toonage: '',
};

const mapStateToProps = (state) => {
	return {
		connected: state.bluetooth.connected,
		selectedDevice: state.bluetooth.selecectedDevice,
		materials: state.normal.materials,
		compositeMaterial: state.normal.compositeMaterial,
		materialsObj: state.normal.materialsObj,
	};
};

const mapDispatchToProps = (dispatch) => {
	console.log('her');
	return {
		updateNetWork: (state) => {
			dispatch(updateNetWork(state));
		},
		savePickAndImage: () => {
			dispatch(savePickupAndImages());
		},
	};
};

const ProcessPickupScreen = (props) => {
	let pickupData = useRoute().params;
	const [materialName, setMaterialName] = useState('homogenoues');
	const [arrayOfMaterial, setArrayOfMaterial] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [bluetoothState, setBluetoothState] = useState(false);
	const [showCompositeModal, setShowCompsiteModal] = useState(false);
	const [homogenouesObj, setHomogenouesObj] = useState({
		materialType: 'Homogenoues',
		id: null,
		tonnage: null,
		price: null,
		materialId: null,
	});

	const [compositeObj, setCompositeObj] = useState({
		materialType: 'Composite',
		compositeClass: null,
		itemId: null,
		price: null,
		name: null,
		description: '',
		itemName: '',
	});
	const [showHomogenousModal, setShowHomogenousModal] = useState(false);
	const [selectIndex, setSelectIndex] = useState();
	const [showAddNewCompositeModal, setShowAddNewCompositeModal] =
		useState(false);

	useEffect(() => {
		let { enabledSubscription, disabledSubscription } =
			BLEapi.stateChanegEvent();

		BLEapi.checkBluetootEnabled();

		return () => {
			console.log('about to remove');
			enabledSubscription.remove();
			disabledSubscription.remove();
			BLEapi.disconnect();
		};
	}, []);

	useEffect(() => {
		let disconnectSub;
		if (props.connected) {
			disconnectSub = BLEapi.onDeviceDisconnected();
			return () => {
				//  disconnectSub();
				console.log('same here');
			};
		}
	}, [props.connected]);
	console.log(props.connected, 'bluetooth state in pickup');
	useEffect(() => {
		console.log('changing bluetoothstate', props.connected);
		setBluetoothState(props.connected);
	}, [props.connected]);

	const handleAddNewModalBackButton = () => {
		setShowAddNewCompositeModal(false);
	};
	let addComposite = (obj) => {
		setArrayOfMaterial((prev) => {
			let newState = prev;
			newState[selectIndex] = obj;
			return newState;
		});
		setShowCompsiteModal(false);
	};

	const onValueChange = (value) => {
		setMaterialName(value);
	};
	let gettingValue = async () => {
		//return 5.7;
		try {
			let reading = await BLEapi.performRead();
			console.log(reading, 'readingg');
			Alert.alert('reading', reading);
			return reading;
		} catch (error) {
			console.log(error);
			Alert.alert('An Error occur', error.message);
		}
	};

	if (!props.connected) return <BluetoothModal />;

	return (
		<Bgcover name='Process Pickup'>
			{/* <CompositeModal
        showCompositeModal={showCompositeModal}
        compositeMaterial={props.compositeMaterial}
        addComposite={addComposite}
        handleModalBackButton={() => {
          setShowCompsiteModal(false);
          console.log(selectIndex, "indd");
          setArrayOfMaterial((prev) => {
            let newState = prev;
            newState[selectIndex] = {
              materialType: "default",
            };

            return newState;
          });
        }}
        showAddNewCompositeModal={() => {
          setShowCompsiteModal(false);
          setShowAddNewCompositeModal(true);
          console.log(selectIndex, "indd");
          setArrayOfMaterial((prev) => {
            let newState = prev;
            newState[selectIndex] = {
              materialType: "default",
            };

            return newState;
          });
        }}
      /> */}
			<CompositeModal_NEW
				showCompositeModal={showCompositeModal}
				compositeMaterial={props.compositeMaterial}
				compositeObj={compositeObj}
				setCompositeObj={setCompositeObj}
				addComposite={addComposite}
				handleModalBackButton={() => {
					setSelectIndex();
					setShowCompsiteModal(false);
					setCompositeObj({
						materialType: 'Composite',
						compositeClass: null,
						itemId: null,
						price: null,
						name: null,
						description: '',
						itemName: '',
					});
				}}
				showAddNewCompositeModal={() => {
					setSelectIndex();
					setShowCompsiteModal(false);
					setShowAddNewCompositeModal(true);
					console.log(selectIndex, 'indd');
				}}
				handleSubmit={() => {
					//    console.log("heee", compositeObj, "PPP");
					if (Number(selectIndex + 1)) {
						console.log(selectIndex, 'index selected');
						setArrayOfMaterial((prev) => {
							let newState = prev;
							prev[selectIndex] = compositeObj;
							return newState;
						});
						setSelectIndex();
					} else {
						console.log('i am adding new material');
						setArrayOfMaterial((prev) => [...prev, compositeObj]);
					}

					setShowCompsiteModal(false);
					setCompositeObj({
						materialType: 'Composite',
						compositeClass: null,
						itemId: null,
						price: null,
						name: null,
						description: '',
						itemName: '',
					});
				}}
			/>
			<HomogeneousModal
				homogeneousModalModal={showHomogenousModal}
				homogenouesObj={homogenouesObj}
				setHomogenouesObj={setHomogenouesObj}
				addComposite={addComposite}
				gettingValue={gettingValue}
				materialsObj={props.materialsObj}
				handleModalBackButton={() => {
					setSelectIndex();
					setShowHomogenousModal(false);
					console.log(selectIndex, 'indd');
					setHomogenouesObj({
						materialType: 'Homogenoues',
						id: undefined,
						tonnage: null,
						price: null,
						materialId: null,
					});
				}}
				handleSubmit={() => {
					if (Number(selectIndex + 1)) {
						setArrayOfMaterial((prev) => {
							let newState = prev;
							prev[selectIndex] = homogenouesObj;
							return newState;
						});
						setSelectIndex();
					} else {
						// setArrayOfMaterial((prev) => [...prev, homogenouesObj]);
						setArrayOfMaterial((prev) => [...prev, { ...homogenouesObj }]);
					}
					setShowHomogenousModal(false);
					setHomogenouesObj({
						materialType: 'Homogenoues',
						id: undefined,
						tonnage: null,
						price: null,
					});
				}}
			/>
			<AddComposite
				showAddNewCompositeModal={showAddNewCompositeModal}
				handleAddNewModalBackButton={handleAddNewModalBackButton}
			/>
			<ScrollView>
				<View style={{ paddingHorizontal: 20 }}>
					<View style={styles.longTextInput}>
						<Text style={{ fontSize: 18, color: 'black' }}>
							{pickupData.producer.phone}
						</Text>
					</View>
					<View style={styles.longTextInput}>
						<Text
							style={{
								fontSize: 18,
								color: 'black',
								width: '100%',
							}}
						>
							{pickupData.producer_name}
						</Text>
					</View>
					{arrayOfMaterial.map((obj, index) => {
						return (
							<>
								{obj.materialType === 'Composite' && (
									<View
										style={{
											padding: 20,
											elevation: 1,
											borderRadius: 10,
											//  borderWidth: 1,
											// borderColor: "#F18921",
											shadowColor: '#F18921',
											marginVertical: 10,
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between',
											}}
										>
											<Text style={{ fontWeight: 'bold', fontSize: 12 }}>
												{obj.itemName}
											</Text>
											<Text>{numberWithCommas(obj.price)}</Text>
										</View>
										<Image
											source={require('../assets/image.png')}
											style={{
												width: 50,
												height: 50,
												marginVertical: 10,
											}}
										/>
										<Text style={{ fontWeight: '700' }}>
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Ut enim ad minim veniam, quis nostrud exercitation
											ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
										</Text>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												marginTop: 10,
											}}
										>
											<TouchableOpacity
												style={{
													padding: 5,
													// height: 50,
													alignSelf: 'center',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 10,
													paddingHorizontal: 20,
													borderWidth: 1,
													borderColor: '#0A956A',
												}}
												onPress={() => {
													console.log(index, 'index');
													setSelectIndex(index);
													setCompositeObj(arrayOfMaterial[index]);
													setShowCompsiteModal(true);
												}}
											>
												<Text style={{ color: '#0A956A', fontWeight: 'bold' }}>
													Edit
												</Text>
											</TouchableOpacity>

											<TouchableOpacity
												style={{
													padding: 5,
													// height: 50,
													alignSelf: 'center',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 10,
													paddingHorizontal: 20,
													borderWidth: 1,
													borderColor: '#ED2C2C',
												}}
												onPress={() => {
													setArrayOfMaterial((prev) => {
														let newState = prev;
														newState.splice(index, 1);
														return newState;
													});
													setRefresh(!refresh);
												}}
											>
												<Text style={{ color: '#ED2C2C', fontWeight: 'bold' }}>
													Delete
												</Text>
											</TouchableOpacity>
										</View>
									</View>
								)}
								{obj.materialType === 'Homogenoues' && (
									<View
										style={{
											padding: 20,
											//  elevation: 1,
											borderRadius: 10,
											borderWidth: 1,
											borderColor: '#F18921',
											shadowColor: '#F18921',
											marginVertical: 10,
										}}
									>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between',
											}}
										>
											<Text style={{ fontWeight: 'bold', fontSize: 15 }}>
												{obj.id}
											</Text>
											<Text style={{ fontWeight: 'bold', fontSize: 15 }}>
												{obj.tonnage} Kg
											</Text>
										</View>
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-around',
												marginTop: 10,
											}}
										>
											<TouchableOpacity
												style={{
													padding: 5,
													// height: 50,
													alignSelf: 'center',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 10,
													paddingHorizontal: 20,
													borderWidth: 1,
													borderColor: '#0A956A',
												}}
												onPress={() => {
													setSelectIndex(index);
													setHomogenouesObj(arrayOfMaterial[index]);
													setShowHomogenousModal(true);
												}}
											>
												<Text style={{ color: '#0A956A', fontWeight: 'bold' }}>
													Edit
												</Text>
											</TouchableOpacity>

											<TouchableOpacity
												style={{
													padding: 5,
													// height: 50,
													alignSelf: 'center',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 10,
													paddingHorizontal: 20,
													borderWidth: 1,
													borderColor: '#ED2C2C',
												}}
												onPress={() => {
													setArrayOfMaterial((prev) => {
														let newState = prev;
														newState.splice(index, 1);
														return newState;
													});
													setRefresh(!refresh);
												}}
											>
												<Text style={{ color: '#ED2C2C', fontWeight: 'bold' }}>
													Delete
												</Text>
											</TouchableOpacity>
										</View>
									</View>
								)}
							</>
						);
					})}
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<TouchableOpacity
							style={{
								flexDirection: 'row',
								marginBottom: 20,
								borderColor: '#F18921',
								borderWidth: 1,
								alignSelf: 'flex-start',
								padding: 10,
								borderRadius: 10,
							}}
							onPress={() => {
								setShowCompsiteModal(true);
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor: '#F18921',
									paddingTop: 2,
									borderRadius: 10,
									paddingHorizontal: 2,
									marginRight: 5,
									alignSelf: 'flex-end',
								}}
							>
								<Image
									style={{ bottom: 1 }}
									source={require('../assets/addition-thick-symbol.png')}
								/>
							</TouchableOpacity>
							<Text style={{ color: '#F18921', fontWeight: 'bold' }}>
								Add Household
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={{
								flexDirection: 'row',
								marginBottom: 20,
								borderColor: '#F18921',
								borderWidth: 1,
								alignSelf: 'flex-start',
								padding: 10,
								borderRadius: 10,
							}}
							onPress={() => {
								setShowHomogenousModal(true);
							}}
						>
							<TouchableOpacity
								style={{
									backgroundColor: '#F18921',
									paddingTop: 2,
									borderRadius: 10,
									paddingHorizontal: 2,
									marginRight: 5,
									alignSelf: 'flex-end',
								}}
							>
								<Image
									style={{ bottom: 1 }}
									source={require('../assets/addition-thick-symbol.png')}
								/>
							</TouchableOpacity>
							<Text style={{ color: '#F18921', fontWeight: 'bold' }}>
								Add Per kilo
							</Text>
						</TouchableOpacity>
					</View>
					<Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>
						Total
					</Text>
					<View
						style={{
							height: 50,
							borderColor: '#F18921',
							borderWidth: 1,
							borderStyle: 'solid',
							justifyContent: 'center',
							paddingHorizontal: 10,
							marginBottom: 20,
							borderRadius: 10,
							width: 'auto',
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 18,
								color: 'black',
								width: '100%',
							}}
						>
							{numberWithCommas(
								arrayOfMaterial.reduce((prev, current) => {
									return prev + (current.price ? Number(current.price) : 0);
								}, 0)
							)}
						</Text>
					</View>

					{arrayOfMaterial.length > 0 ? (
						<View
							style={{ flexDirection: 'row', justifyContent: 'space-between' }}
						>
							<TouchableOpacity
								style={{
									height: 55,
									backgroundColor: '#0A956A',
									borderRadius: 10,
									justifyContent: 'center',
									paddingHorizontal: 10,
								}}
								onPress={() => {
									props.navigation.navigate('confirmation', {
										materials: arrayOfMaterial,
										pickupId: pickupData.id,
										producerData: pickupData.producer,
										mode: 'Wallet',
										producerId: pickupData.producer_id,
									});
								}}
							>
								<Text
									style={{
										fontSize: 13,
										fontWeight: 'bold',
										color: 'white',
										textAlign: 'center',
									}}
								>
									Pay with Wallet
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={{
									height: 55,
									backgroundColor: '#0A956A',
									borderRadius: 10,
									justifyContent: 'center',
									paddingHorizontal: 10,
								}}
								onPress={() => {
									props.navigation.navigate('confirmation', {
										materials: arrayOfMaterial,
										pickupId: pickupData.id,
										producerData: pickupData.producer,
										mode: 'Cash',
										producerId: pickupData.producer_id,
									});
								}}
							>
								<Text
									style={{
										fontSize: 13,
										fontWeight: 'bold',
										color: 'white',
										textAlign: 'center',
									}}
								>
									Pay with Cash
								</Text>
							</TouchableOpacity>
						</View>
					) : null}
				</View>
			</ScrollView>
		</Bgcover>
	);
};

const styles = StyleSheet.create({
	longTextInput: {
		height: 50,
		borderColor: '#F18921',
		borderWidth: 1,
		borderStyle: 'solid',
		justifyContent: 'center',
		paddingHorizontal: 10,
		marginBottom: 20,
		width: '100%',
		borderRadius: 10,
	},
	pickerContainer: {
		borderWidth: 1,
		borderColor: '#F18921',
		borderStyle: 'solid',
		borderRadius: 10,
		marginBottom: 20,
	},
	pickerInputAndroid: {
		color: 'black',
		fontWeight: '700',
		fontSize: 18,
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProcessPickupScreen);
