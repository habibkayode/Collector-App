import React, { useEffect, useRef, useState } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	ActivityIndicator,
	FlatList,
} from 'react-native';
import BgCover from '../Component/Bg/BackgroundCover';
import { Pages } from 'react-native-pages';
import { Dropdown } from 'react-native-material-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { numberWithCommas } from '../helper/helper';
import {
	getCOGbalance,
	getCommissionBalance,
	getBankList,
	getWalletHistory,
	getWalletHistoryCOG,
} from '../Api/api';
import moment from 'moment';
import { dateAgo } from '../utils/helpers';

const WalletScreen = (props) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [title, setTitle] = useState('Commission');
	const [buttonText, setButtonText] = useState('Withdraw Commission');
	const [dateFilter, setDateFilter] = useState();
	const [refresh, setRefresh] = useState(false);
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [modalCalender, setModalCalender] = useState(false);
	const [balance, setBalance] = useState({
		commission: 0,
		account: 0,
	});
	const [loading, setLoading] = useState(true);

	let [obj, setObj] = useState({});
	const [cogHistory, setCogHistory] = useState([]);
	const [commissionHistory, setCommissionHistory] = useState([]);
	const [commissionHistoryVariable, setCommissionHistoryVariable] = useState(
		[]
	);
	const [cogHistoryVariable, setCogHistoryVariable] = useState([]);

	let [loading2, setLoading2] = useState(true);
	let pageRef = useRef();

	let filterByDateRange = () => {
		let newData;
		if (currentIndex === 0) {
			newData = commissionHistory.filter((i) =>
				moment(i.date).isBetween(startDate, endDate)
			);
			setCommissionHistoryVariable(newData);
		} else if (currentIndex === 1) {
			newData = cogHistory.filter((i) =>
				moment(i.date).isBetween(startDate, endDate)
			);
			setCogHistoryVariable(newData);
		}

		//setVariableObj(newHistory);
		setModalCalender(false);
		setEndDate();
		setStartDate();
	};

	let onDateChange = (date, type) => {
		console.log(date, type, 'dates');
		if (type === 'END_DATE') {
			setEndDate(date);
		} else {
			setStartDate(date);
		}
	};

	useEffect(() => {
		if (currentIndex === 0) {
			setTitle('Commission');
			setButtonText('Withdraw Commission');
		}

		if (currentIndex === 1) {
			setTitle('Account Balance');
			setButtonText('Withdraw ');
		}

		if (currentIndex === 2) {
			setTitle('Account Balance');
			setButtonText('In-wallet Transfer');
		}
	}, [currentIndex]);

	let getBalance = async () => {
		try {
			let commissionResponse = await getCommissionBalance();
			let accountBalanceResponse = await getCOGbalance();
			setBalance({
				commission: commissionResponse.data.balance,
				account: accountBalanceResponse.data.balance,
			});
			setLoading(false);
		} catch (e) {
			console.log(e, 'comma');
		}
	};

	let getCOGHistory = async (query) => {
		let historyResponse = await getWalletHistoryCOG(query);
		setCogHistory(historyResponse.data);
		setCogHistoryVariable(historyResponse.data);
		setLoading2(false);
	};

	let getCommissionHistory = async (query) => {
		let historyResponse = await getWalletHistory(query);
		console.log(historyResponse, 'commission history');
		setCommissionHistory(historyResponse.data);
		setCommissionHistoryVariable(historyResponse.data);

		setLoading(false);
	};

	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			setLoading(true);
			setLoading2(true);
			getBalance();

			//getHistory();

			getCOGHistory();
			getCommissionHistory();
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [props.navigation]);

	React.useEffect(() => {
		getBankList();
	}, []);

	const renderItem = ({ item, index }) => {
		let dataArray = [];
		if (currentIndex == 0) {
			dataArray = commissionHistoryVariable;
		} else {
			dataArray = cogHistoryVariable;
		}
		let hold = item.Beneficiary.split('-')[0];
		let hold2 = hold.split(' ');
		let showHeader;
		let beneficiary = hold2.length > 0 ? hold2[hold2.length - 1] : hold2[0];
		if (index === 0) {
			showHeader = true;
		} else {
			try {
				let previousDate = dataArray[index - 1].date.split(' ');
				let currentDate = item.date.split(' ');
				showHeader = currentDate[0] === previousDate[0] ? false : true;
			} catch (error) {
				console.log(error, index);
				console.log(index, 'oo');
			}
		}

		return (
			<>
				{showHeader && (
					<View
						style={{
							backgroundColor: '#E8E8E8',
							padding: 10,
						}}
					>
						<Text style={{ fontWeight: 'bold' }}>
							{moment(item.date).format('Do MMM YY')}
						</Text>
					</View>
				)}
				<TouchableOpacity
					style={{
						flexDirection: 'row',
						marginVertical: 2,
						width: '100%',
						paddingVertical: 5,
						paddingHorizontal: 10,
					}}
					onPress={() => {
						props.navigation.navigate('WalletDetail', item);
					}}
				>
					<Text style={{ width: 20 }}>{index + 1}</Text>
					<Image
						style={{ marginLeft: 20 }}
						source={require('../assets/money-new.png')}
					/>
					<Text style={{ flex: 1, textAlign: 'center' }}>{beneficiary}</Text>
					<Text
						style={{
							color: item.type == 'Cr' ? 'green' : 'red',
						}}
					>
						{numberWithCommas(item.amount)}
					</Text>
				</TouchableOpacity>
			</>
		);
	};

	return (
		<BgCover name='Wallet'>
			{loading || loading2 ? (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Image
						source={require('../assets/loading-gif.gif')}
						style={{ width: 50, height: 50 }}
					></Image>
				</View>
			) : (
				<View style={{ flex: 1, height: '100%', marginBottom: 10 }}>
					<TouchableOpacity
						style={{
							flexDirection: 'row',
							marginBottom: 20,
							alignSelf: 'flex-end',
							marginHorizontal: 20,
						}}
						onPress={() => {
							props.navigation.navigate('FundWallet');
						}}
					>
						<Text
							style={{ color: 'black', fontWeight: 'bold', marginRight: 5 }}
						>
							Fund Wallet
						</Text>
						<View
							style={{
								backgroundColor: '#F18921',
								paddingVertical: 2,
								borderRadius: 10,
								paddingHorizontal: 3,
								marginRight: 5,
								alignSelf: 'flex-start',
								top: 0,
							}}
						>
							<Image
								style={{ bottom: 0 }}
								source={require('../assets/addition-thick-symbol.png')}
							/>
						</View>
					</TouchableOpacity>
					<Pages
						onHalfway={(i, k) => {
							setCurrentIndex(Number(i));
						}}
						onScrollEnd={(index) => {
							// setCurrentIndex(Number(index));
						}}
						backgroundColor={'white'}
						horizontal={true}
						indicatorColor='none'
						ref={(r) => (pageRef.current = r)}
					>
						{[1, 2].map((i) => (
							<View style={{ flex: 1 }} key={i}>
								<View
									style={{
										marginHorizontal: 20,
										padding: 20,
										backgroundColor: '#0A956A',
										marginBottom: 20,
										borderRadius: 10,
									}}
								>
									<Text
										style={{
											color: 'white',
											fontWeight: 'bold',
											alignSelf: 'center',
											textAlign: 'center',
											fontSize: 18,
										}}
									>
										{title}
									</Text>

									<Text
										style={{
											color: 'white',
											fontWeight: 'bold',
											alignSelf: 'center',
											textAlign: 'center',
											fontSize: 25,
											marginVertical: 10,
										}}
									>
										{numberWithCommas(
											currentIndex === 0
												? Number(balance.commission)
												: balance.account
										)}
									</Text>
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-around',
											marginTop: 10,
										}}
									>
										<TouchableOpacity
											style={{ alignSelf: 'flex-start', padding: 20 }}
											onPress={() => {
												pageRef.current.scrollToPage(0);
											}}
										>
											<View
												style={{
													padding: 10,
													backgroundColor:
														currentIndex === 0 ? 'white' : 'transparent',
													alignSelf: 'center',
													borderRadius: 7,
												}}
											>
												<Image
													source={require('../assets/coins.png')}
													style={{
														alignSelf: 'center',
													}}
												/>
											</View>
											<Text style={{ color: 'white', fontSize: 12 }}>
												Commission
											</Text>
										</TouchableOpacity>

										<TouchableOpacity
											style={{ alignSelf: 'flex-start', padding: 20 }}
											onPress={() => {
												pageRef.current.scrollToPage(1);
											}}
										>
											<View
												style={{
													padding: 10,
													backgroundColor:
														currentIndex === 1 ? 'white' : 'transparent',
													alignSelf: 'center',
													borderRadius: 7,
												}}
											>
												<Image
													source={require('../assets/money.png')}
													style={{
														alignSelf: 'center',
													}}
												/>
											</View>
											<Text style={{ color: 'white', fontSize: 12 }}>
												Account
											</Text>

											<Text style={{ color: 'white', fontSize: 12 }}>
												Balance
											</Text>
										</TouchableOpacity>

										{/* <TouchableOpacity
                      style={{ alignSelf: "flex-start" }}
                      onPress={() => {
                        pageRef.current.scrollToPage(2);
                      }}
                    >
                      <View
                        style={{
                          padding: 5,
                          backgroundColor:
                            currentIndex === 2 ? "white" : "transparent",
                          alignSelf: "center",
                          borderRadius: 7,
                        }}
                      >
                        <Image
                          source={require("../assets/purse-small.png")}
                          style={{
                            alignSelf: "center",
                          }}
                        />
                      </View>

                      <Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: 12,
                        }}
                      >
                        In-wallet
                      </Text>
                      <Text style={{ color: "white", fontSize: 12 }}>
                        Transaction
                      </Text>
                    </TouchableOpacity> */}
									</View>
								</View>
								<TouchableOpacity
									onPress={() => {
										if (currentIndex === 1)
											props.navigation.navigate('WithdrawCOG');
										if (currentIndex === 0)
											props.navigation.navigate('WithdrawComission');

										if (currentIndex === 2)
											props.navigation.navigate('WalletToWallet');
									}}
									style={{
										width: 110,
										paddingVertical: 10,
										marginHorizontal: 20,
										borderRadius: 10,
										alignSelf: 'flex-start',
										backgroundColor: '#F18921',
									}}
								>
									<Text
										style={{
											color: 'white',
											textAlign: 'center',
											fontWeight: 'bold',
										}}
									>
										{buttonText}
									</Text>
								</TouchableOpacity>
								<View
									style={{
										marginTop: 10,
										marginHorizontal: 20,
										flexDirection: 'row',
										justifyContent: 'space-between',
									}}
								>
									<View>
										<Text
											style={{
												fontWeight: 'bold',
												fontSize: 14,
											}}
											onLayout={(e) => {
												//setLineWidth(e.nativeEvent.layout.width);
											}}
										>
											Transaction history
										</Text>
										<View
											style={{
												width: 70,
												backgroundColor: '#0A956A',
												height: 3,
												marginBottom: 10,
											}}
										></View>
									</View>
									<TouchableOpacity
										style={{
											marginRight: 20,
											justifyContent: 'center',
											flexDirection: 'row',
											borderColor: '#F18921',
											borderRadius: 10,
										}}
										onPress={() => {
											setModalCalender(true);
										}}
										//  style={{ flexDirection: "row" }}
									>
										<MaterialCommunityIcons
											name='calendar-range'
											color='grey'
											size={20}
										/>
										{/* <Text>Date Range</Text> */}
									</TouchableOpacity>
									<Dropdown
										// label="Status"
										placeholder='Days'
										placeholderTextColor='grey'
										onChangeText={(value) => {
											if (value !== 'all') {
												let pastDate = dateAgo(Number(value));

												let newDummy = { ...obj };
												let newDate = new Date();
												newDate.setDate(new Date().getDate() - Number(value));
												newDate.setHours(0, 0, 0, 0);
												let newData;
												if (currentIndex === 0) {
													newData = commissionHistory.filter(
														(u) => new Date(u.date) >= newDate
													);
													setCommissionHistoryVariable(newData);
												}

												if (currentIndex === 1) {
													newData = cogHistory.filter(
														(u) => new Date(u.date) >= newDate
													);
													setCogHistoryVariable(newData);
												}
												setRefresh(!refresh);
												setDateFilter(Number(value));
											} else {
												if (currentIndex === 0) {
													setCommissionHistoryVariable(commissionHistory);
												} else {
													setCogHistoryVariable(cogHistoryVariable);
												}
											}
										}}
										baseColor='grey'
										textColor='black'
										//   itemColor="white"
										selectedItemColor='black'
										fontSize={12}
										dropdownOffset={{ top: 0, left: 0 }}
										inputContainerStyle={{
											borderBottomColor: 'transparent',
											//   width: 100,
										}}
										containerStyle={{
											width: 95,
										}}
										data={[
											{
												label: 'All ',
												value: 'all',
											},
											{
												label: 'Today',
												value: 0,
											},

											{
												label: 'Yesterday',
												value: 1,
											},
											{
												label: '3 days Ago',
												value: 3,
											},
											{
												label: '1 week Ago',
												value: 7,
											},
											{
												label: '2 Weeks',
												value: 14,
											},

											{
												label: '1 month Ago',
												value: 30,
											},

											{
												label: '2 month Ago',
												value: 60,
											},

											{
												label: '3 month Ago',
												value: 90,
											},

											{
												label: '6 month Ago',
												value: 180,
											},
											{
												label: '1 year Ago',
												value: 365,
											},
										]}
									/>
								</View>

								{currentIndex === 0 && (
									<FlatList
										extraData={currentIndex}
										data={commissionHistoryVariable}
										renderItem={renderItem}
									/>
								)}

								{currentIndex === 1 && (
									<FlatList data={cogHistoryVariable} renderItem={renderItem} />
								)}
							</View>
						))}
					</Pages>
				</View>
			)}

			<Modal
				isVisible={modalCalender}
				onBackButtonPress={() => {
					setModalCalender(false);
				}}
				style={styles.modal}
				animationInTiming={300}
				animationOutTiming={300}
				backdropOpacity={0.5}
				animationIn='slideInDown'
				animationOut='slideOutUp'
			>
				<TouchableOpacity
					activeOpacity={1}
					style={{ height: '100%', width: '100%', flex: 1 }}
					onPress={() => {
						console.log('first 11');
						setModalCalender(false);
					}}
				>
					<TouchableWithoutFeedback onPress={() => {}}>
						<View style={{ backgroundColor: 'white', marginHorizontal: 10 }}>
							<CalendarPicker
								startFromMonday={true}
								allowRangeSelection={true}
								//  minDate={minDate}
								maxDate={new Date()}
								todayBackgroundColor='#f2e6ff'
								selectedDayColor='#F18921'
								selectedDayTextColor='#FFFFFF'
								onDateChange={onDateChange}
							/>
							{startDate && endDate && (
								<TouchableOpacity
									onPress={() => {
										filterByDateRange();
									}}
									style={{
										padding: 10,
										borderRadius: 10,
										alignSelf: 'center',
										backgroundColor: '#F18921',
										marginBottom: 20,
									}}
								>
									<Text style={{ color: 'white', fontWeight: 'bold' }}>
										Proceed
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</TouchableWithoutFeedback>
				</TouchableOpacity>
			</Modal>
		</BgCover>
	);
};

const styles = StyleSheet.create({
	wrapper: { height: 300 },
	slide1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
	},
	slide2: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5',
	},
	slide3: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9',
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
	},

	modal: {
		//  justifyContent: "center",
		margin: 0,
		position: 'absolute',
		flex: 1,
		height: '100%',
		alignSelf: 'flex-start',
		justifyContent: 'flex-start',
		width: '100%',
	},
});

export default WalletScreen;
