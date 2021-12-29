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
import CompositeModal from '../Component/CompositModal';
import Bgcover from '../Component/Bg/BackgroundCover';
import { useRoute } from '@react-navigation/core';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddComposite from '../Component/AddCompositeModal';

const defaultMaterial = {
	materialType: '',
	toonage: '',
};

const mapStateToProps = (state) => {
	console.log(state.bluetooth.connected, 'bluetoothstate');
	return {
		connected: state.bluetooth.connected,
		selectedDevice: state.bluetooth.selectedDevice,
		materials: state.normal.materials,
		compositeMaterial: state.normal.compositeMaterial,
		materialsObj: state.normal.materialsObj,
	};
};

const mapDispatchToProps = (dispatch) => {
	console.log('her');
	return {
		updateNetWork: (state) => {
			console.log(state, 'stae 0');
			dispatch(updateNetWork(state));
		},
		savePickAndImage: () => {
			dispatch(savePickupAndImages());
		},
	};
};

const ProcessPickupScreen = (props) => {
	let pickupData = useRoute().params;
	console.log(pickupData, 'pickUpData');

	const [materialName, setMaterialName] = useState('homogenoues');
	const [arrayOfMaterial, setArrayOfMaterial] = useState([{}]);
	const [refresh, setRefresh] = useState(false);
	const [bluetoothState, setBluetoothState] = useState(false);
	const [showCompositeModal, setShowCompsiteModal] = useState(false);
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

	let gettingValue = async (index) => {
		let reading = await BLEapi.performRead();
		console.log(reading, 'readingg', index);
		setArrayOfMaterial((prev) => {
			let newState = prev;
			console.log(newState[index], 'new state in  tonnage');
			newState[index] = {
				...newState[index],
				tonnage: reading,
				id: props.materialsObj[newState[index].materialName].id,
				price: reading
					? reading * props.materialsObj[newState[index].materialName].price
					: 0,
			};
			return newState;
		});

		// setArrayOfMaterial((prev) => {
		//   let newState = prev;
		//   newState[selectIndex] = {
		//     ...newState[selectIndex],
		//     price: reading
		//       ? reading *
		//         props.materialsObj[newState[selectIndex].materialName].price
		//       : 0,
		//   };
		//   console.log(newState[selectIndex], "prickkk");
		//   return newState;
		// });

		setRefresh(!refresh);
		Alert.alert('reading', reading);
	};

	if (!props.connected) return <BluetoothModal />;

	return (
		<Bgcover name='Process Pickup'>
			<CompositeModal
				showCompositeModal={showCompositeModal}
				compositeMaterial={props.compositeMaterial}
				addComposite={addComposite}
				handleModalBackButton={() => {
					setShowCompsiteModal(false);
					console.log(selectIndex, 'indd');
					setArrayOfMaterial((prev) => {
						let newState = prev;
						newState[selectIndex] = {
							materialType: 'default',
						};

						return newState;
					});
				}}
				showAddNewCompositeModal={() => {
					setShowCompsiteModal(false);
					setShowAddNewCompositeModal(true);
					console.log(selectIndex, 'indd');
					setArrayOfMaterial((prev) => {
						let newState = prev;
						newState[selectIndex] = {
							materialType: 'default',
						};

						return newState;
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
					{/* <RNPickerSelect
            placeholder={{
              label: "Select Material Type",
              value: "default",
              color: "black",
            }}
            onValueChange={(value) => {
              setFirstMaterial({ materialType: value });
              if (value === "Composite") setShowCompsiteModal(true);
            }}
            style={{
              viewContainer: {
                borderWidth: 1,
                borderColor: "#F18921",
                borderStyle: "solid",
                borderRadius: 10,
                marginBottom: 20,
              },
              inputAndroid: {
                color: "black",
                fontWeight: "700",
                fontSize: 18,
              },
              placeholder: {
                fontWeight: "bold",
              },
            }}
            value={firstMaterial.materialType}
            items={[
              { label: "Homgenous ", value: "Homogenous", color: "black" },
              { label: "Composite", value: "Composite", color: "black" },
            ]}
          />
          {firstMaterial.materialType === "Homogenous" && (
            <>
              <RNPickerSelect
                placeholder={{
                  label: "Select class of Material",
                  value: "default",
                  color: "black",
                }}
                onValueChange={(value) =>
                  setFirstMaterial((prev) => {
                    return {
                      ...prev,
                      materialClass: value,
                    };
                  })
                }
                style={{
                  viewContainer: {
                    borderWidth: 1,
                    borderColor: "#F18921",
                    borderStyle: "solid",
                    borderRadius: 10,
                    marginBottom: 20,
                  },
                  placeholder: {
                    color: "black",
                    fontWeight: "bold",
                  },
                }}
                value={firstMaterial.materialClass}
                items={[
                  { label: "Composite", value: "Composite", color: "black" },
                  { label: "Composite 1", value: "1", color: "black" },
                  { label: "Composite 2", value: "2", color: "black" },
                ]}
              />
              <View
                style={{
                  marginBottom: 20,
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    borderColor: "#F18921",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 10,
                    width: "47%",
                    height: 50,
                  }}
                >
                  <TextInput
                    // editable={fale}
                    placeholder="Tonnage in Kg"
                    keyboardType="numeric"
                    value={tonnage}
                    onChangeText={(value) =>
                      setArrayOfMaterial((prev) => {
                        let newState = prev;
                        newState[0] = {
                          ...newState[0],
                          toonage: value,
                        };
                        return newState;
                      })
                    }
                    style={{ fontWeight: "bold", fontSize: 16 }}
                  />
                </View>
                <Button
                  style={{
                    padding: 5,
                    height: 50,
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    paddingHorizontal: 10,
                  }}
                  onPress={() => gettingValue()}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Get Value
                  </Text>
                </Button>
              </View>
            </>
          )} */}

					{/* <View
            style={{
              height: 50,
              borderColor: "#F18921",
              borderWidth: 1,
              borderStyle: "solid",
              justifyContent: "center",
              paddingHorizontal: 10,
              marginBottom: 20,
              borderRadius: 10,
              width: "auto",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                color: "black",
                width: "100%",
              }}
            >
              Class A
            </Text>
          </View> */}

					{arrayOfMaterial.map((obj, index) => {
						return (
							<View key={index}>
								<RNPickerSelect
									key={arrayOfMaterial[index].materialType}
									//                  useNativeAndroidPickerStyle={false}
									placeholder={{
										label: 'Select Material Type',
										value: 'default',
										color: 'black',
									}}
									onValueChange={(value) => {
										console.log(value);
										setSelectIndex(index);
										setArrayOfMaterial((prev) => {
											let newState = prev;
											newState[index] = {
												materialType: value,
											};
											return newState;
										});
										if (value === 'Composite') setShowCompsiteModal(true);
										{
											setRefresh(!refresh);
										}
									}}
									style={{
										viewContainer: styles.pickerContainer,
										inputAndroid: styles.pickerInputAndroid,
										placeholder: {
											fontWeight: 'bold',
										},
									}}
									value={arrayOfMaterial[index].materialType}
									items={[
										{
											label: 'Homogenous ',
											value: 'Homogenous',
											color: 'black',
										},
										{
											label: 'Composite',
											value: 'Composite',
											color: 'black',
										},
									]}
								/>
								{arrayOfMaterial[index].materialType === 'Homogenous' && (
									<>
										<RNPickerSelect
											placeholder={{
												label: 'Select Material',
												value: 'default',
												color: 'black',
											}}
											onValueChange={(value) => {
												setArrayOfMaterial((prev) => {
													let newState = prev;
													newState[index] = {
														materialType: 'Homogenous',
														materialName: value,
													};
													return newState;
												});

												setRefresh(!refresh);
											}}
											style={{
												viewContainer: styles.pickerContainer,
												inputAndroid: styles.pickerInputAndroid,
											}}
											value={obj.materialName}
											items={props.materials.map((i) => {
												return {
													label: i.name,
													value: i.name,
													color: 'black',
												};
											})}
											// items={[
											//   {
											//     label: "Composite",
											//     value: "Composite",
											//     color: "black",
											//   },
											//   { label: "Composite 1", value: "1", color: "black" },
											//   { label: "Composite 2", value: "2", color: "black" },
											// ]}
										/>
										{/* <View
                      style={{
                        borderColor: "#F18921",
                        borderWidth: 1,
                        borderStyle: "solid",
                        paddingHorizontal: 20,
                        borderRadius: 10,
                        width: "47%",
                        height: 50,
                        marginBottom: 20,
                      }}
                    >
                      <TextInput
                        placeholder="Tonnage in Kg"
                        keyboardType="numeric"
                        value={tonnage}
                        onChangeText={(value) =>
                          setArrayOfMaterial((prev) => {
                            let newState = prev;
                            newState[index] = {
                              ...newState[index],
                              toonage: value,
                            };
                            return newState;
                          })
                        }
                        style={{ fontWeight: "bold", fontSize: 16 }}
                      />
                    </View> */}
										<View
											style={{
												marginBottom: 20,
												width: '100%',
												flexDirection: 'row',
												justifyContent: 'space-between',
											}}
										>
											<View
												style={{
													borderColor: '#F18921',
													borderWidth: 1,
													borderStyle: 'solid',
													borderRadius: 10,
													height: 50,
													justifyContent: 'center',
													alignItems: 'center',
													alignSelf: 'flex-start',
													paddingHorizontal: 10,
												}}
											>
												<Text style={{ fontWeight: 'bold', fontSize: 16 }}>
													{obj.tonnage
														? (obj.tonnage + ' Kg').trim()
														: 'Tonnage in Kg'}
												</Text>
												{/* <TextInput
                          // editable={fale}

                          keyboardType="numeric"
                          value={tonnage}
                          onChangeText={(value) =>
                            setArrayOfMaterial((prev) => {
                              let newState = prev;
                              newState[0] = {
                                ...newState[0],
                                toonage: value,
                              };
                              return newState;
                            })
                          }
                          style={{ fontWeight: "bold", fontSize: 16 }}
                        /> */}
											</View>
											<Button
												style={{
													padding: 5,
													height: 50,
													alignSelf: 'center',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 10,
													paddingHorizontal: 10,
												}}
												onPress={() => gettingValue(index)}
											>
												<Text style={{ color: 'white', fontWeight: 'bold' }}>
													Get Value
												</Text>
											</Button>
										</View>
									</>
								)}

								{arrayOfMaterial[index].materialType === 'Composite' && (
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
											<Text style={{ fontWeight: 'bold', fontSize: 18 }}>
												{obj.itemName}
											</Text>
											<TouchableOpacity
												style={{
													flexDirection: 'row',
													alignSelf: 'flex-end',
												}}
												onPress={() => {
													setSelectIndex(index);
													setShowCompsiteModal(true);
												}}
											>
												<Text
													style={{ fontWeight: 'bold', fontSize: 17 }}
												></Text>
												<MaterialCommunityIcons
													name='file-document-edit'
													color='#F18921'
													size={20}
												/>
											</TouchableOpacity>
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
									</View>
								)}
							</View>
						);
					})}

					<TouchableOpacity
						style={{ flexDirection: 'row', marginBottom: 20 }}
						onPress={() => {
							console.log(arrayOfMaterial);
							setArrayOfMaterial((prev) => {
								let newState = prev.concat(defaultMaterial);
								return newState;
							});
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
						<Text style={{ color: '#BBB9B9', fontWeight: 'bold' }}>
							Add another material type {'&'} tonnage
						</Text>
					</TouchableOpacity>
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
							#{' '}
							{arrayOfMaterial.reduce((prev, current) => {
								console.log(current.price, 'price of cuure', prev);
								return prev + (current.price ? Number(current.price) : 0);
							}, 0)}
						</Text>
					</View>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between' }}
					>
						<TouchableOpacity
							style={{
								height: 55,
								backgroundColor: '#0A956A',
								borderRadius: 10,
								justifyContent: 'center',
								paddingHorizontal: 20,
							}}
							onPress={() => {
								props.navigation.navigate('confirmation', {
									materials: arrayOfMaterial,
									pickupId: pickupData.id,
									producerData: pickupData.producer,
									mode: 'wallet',
									producerId: pickupData.producer_id,
								});
							}}
						>
							<Text
								style={{
									fontSize: 14,
									fontWeight: 'bold',
									color: 'white',
									textAlign: 'center',
								}}
							>
								Pay from Wallet
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								height: 55,
								backgroundColor: '#0A956A',
								borderRadius: 10,
								justifyContent: 'center',
								paddingHorizontal: 20,
							}}
							onPress={() => {
								props.navigation.navigate('confirmation', {
									materials: arrayOfMaterial,
									pickupId: pickupData.id,
									producerData: pickupData.producer,
									mode: 'cash',
									producerId: pickupData.producer_id,
								});
							}}
						>
							<Text
								style={{
									fontSize: 14,
									fontWeight: 'bold',
									color: 'white',
									textAlign: 'center',
								}}
							>
								Pay with Cash
							</Text>
						</TouchableOpacity>
					</View>
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
