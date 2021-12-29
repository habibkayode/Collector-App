import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	ActivityIndicator,
	TouchableWithoutFeedback,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Bgcover from '../Component/Bg/BackgroundCover';
import { getAllCollection } from '../Api/api';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { numberWithCommas } from '../helper/helper';
import HistoryCard from '../Component/HistoryCard';
import { Colors } from '../Component/color';
import { dateRangeQuery, pastDateQuery } from '../utils/helpers';

const mapStateToProps = (state) => {
	return {
		pendingCollection: state.normal.pendingCollection,
		materialsObj: state.normal.materialsObj,
	};
};

const CollectionHistory = (props) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [historyResponseObj, setHistoryResponseObj] = useState();
	const [loadingMore, setLoadingMore] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const [allCollection, setAllCollection] = useState([]);
	const [statusFilter, setStatusFilter] = useState('all');
	const [dayDiff, setDayDiff] = useState('all');
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [modalCalender, setModalCalender] = useState(false);
	const [showProceed, setShowProceed] = useState(false);

	let statusFun = (value) => {
		if (value === 'all') return '';
		return `&drop_off_status=${value}`;
	};

	let filterByDateRange = () => {
		let query = dateRangeQuery(startDate, endDate);
		if (statusFilter !== 'all') {
			query = query + statusFun(statusFilter);
		}
		getAllCollectionCaller(query);
		setDayDiff('all');
		setModalCalender(false);
		setShowProceed(false);
	};
	let filterByStatus = (value) => {
		setStatusFilter(value);
		if (value === 'all') return getAllCollectionCaller(null);
		let query = statusFun(value);

		if (dayDiff !== 'all') {
			query = query + pastDateQuery(Number(dayDiff));
		}
		if (startDate && endDate) {
			query = query + dateRangeQuery(startDate, endDate);
		}
		getAllCollectionCaller(query);
	};

	let filterByDays = (value) => {
		if (value === 'all') {
			getAllCollectionCaller(null);
		} else {
			let query = pastDateQuery(value);
			query = query + statusFun(statusFilter);
			getAllCollectionCaller(query);
		}

		setStartDate();
		setEndDate();
	};

	let getAllCollectionCaller = async (query, link) => {
		console.log(query, 'qury', query === null);
		try {
			let response = await getAllCollection(query, link);
			setHistoryResponseObj(response);
			if (query || query === null) {
				setData(response.data);
				setAllCollection(response.data);
			} else {
				setData((prev) => [...prev, ...response.data]);
				setAllCollection((prev) => [...prev, ...response.data]);
			}
			setRefreshing(false);
		} catch (e) {
			console.log(e);
		}
	};

	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			setLoading(true);
			getAllCollectionCaller().then(() => {
				setLoading(false);
				setRefreshing(false);
			});
		});
		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [props.navigation]);

	const handleLoadMore = () => {
		if (historyResponseObj.next_page_url && loadingMore === false) {
			setLoadingMore(true);
			getAllCollectionCaller('', historyResponseObj.next_page_url).then(() => {
				setLoadingMore(false);
			});
		}
	};

	let handleRefresh = () => {
		//		setRefreshing(true);
	};

	let onDateChange = (date, type) => {
		console.log(date, type, 'dates');
		if (type === 'END_DATE') {
			setEndDate(date);
			setShowProceed(true);
		} else {
			setStartDate(date);
		}
	};

	return (
		<Bgcover name='Collection History'>
			{loading ? (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Image
						source={require('../assets/loading-gif.gif')}
						style={{ width: 50, height: 50 }}
					></Image>
				</View>
			) : allCollection.length === 0 && loading === true ? (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Text style={{ fontSize: 18, textAlign: 'center', color: '#F18921' }}>
						No Collection Data yet..
					</Text>
				</View>
			) : (
				<View style={{ marginBottom: 100 }}>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 18,
							marginHorizontal: 20,
							marginBottom: 10,
							color: 'black',
						}}
					>
						Filter By
					</Text>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'space-between',
							marginHorizontal: 10,
							width: '100%',
							//  backgroundColor: "red",
							marginBottom: 20,
						}}
					>
						<Dropdown
							placeholder='Status'
							placeholderTextColor='gray'
							baseColor='grey'
							onChangeText={(value, index) => {
								filterByStatus(value);
							}}
							// textColor="white"
							fontSize={12}
							dropdownOffset={{ top: 0, left: 0 }}
							containerStyle={{
								borderWidth: 1,
								borderColor: '#F18921',
								borderRadius: 10,
								paddingHorizontal: 10,
							}}
							inputContainerStyle={{
								width: 80,
								borderBottomColor: 'transparent',
								paddingBottom: 0,
							}}
							//   onChangeText={(value) => setDateFilter(Number(value))}
							data={[
								{
									label: 'All ',
									value: 'all',
								},
								{
									label: 'Dropped',
									value: 'droppedoff',
								},
								{
									label: 'Pending',
									value: 'pending',
								},
							]}
						/>
						<Dropdown
							// label="Status"
							placeholder='Days'
							placeholderTextColor='black'
							baseColor='gray'
							textColor='black'
							//   itemColor="white"
							selectedItemColor='black'
							value={dayDiff}
							onChangeText={(value) => {
								setDayDiff(value);
								filterByDays(value);
							}}
							fontSize={12}
							dropdownOffset={{ top: 0, left: 0 }}
							containerStyle={{
								borderWidth: 1,
								borderColor: '#F18921',
								borderRadius: 10,
								paddingHorizontal: 10,
							}}
							inputContainerStyle={{
								width: 95,
								borderBottomColor: 'transparent',
								paddingBottom: 0,
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

						<TouchableOpacity
							style={{
								marginRight: 20,
								justifyContent: 'center',
								flexDirection: 'row',
								borderWidth: 1,
								borderColor: '#F18921',
								borderRadius: 10,
								padding: 10,
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
					</View>

					<FlatList
						contentContainerStyle={{}}
						onRefresh={handleRefresh}
						refreshing={refreshing}
						data={data}
						renderItem={({ item }) => {
							return <HistoryCard data={item} />;
						}}
						keyExtractor={(item, index) => {
							return item.id;
						}}
						extraData={loadingMore}
						onEndReached={handleLoadMore}
						onEndReachedThreshold={0}
						initialNumToRender={10}
						ListFooterComponent={() => {
							if (loadingMore)
								return (
									<ActivityIndicator
										color={Colors.PRIMARY}
										size='large'
										style={{ alignSelf: 'center' }}
									/>
								);
							else return <View />;
						}}
					/>
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
					<TouchableWithoutFeedback
						onPress={() => {
							console.log('first');
						}}
					>
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
							{startDate && endDate && showProceed && (
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
		</Bgcover>
	);
};

const styles = StyleSheet.create({
	headerText: {
		flex: 1,
		alignSelf: 'stretch',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
		textAlignVertical: 'center',
	},
	bodyText: {
		flex: 1,
		alignSelf: 'stretch',
		textAlign: 'center',
		textAlignVertical: 'center',
		paddingHorizontal: 5,
		fontWeight: 'bold',
	},

	pickerContainer: {
		borderWidth: 1,
		borderColor: '#F18921',
		borderStyle: 'solid',
		borderRadius: 10,
		marginBottom: 20,
		marginHorizontal: 20,
		// alignSelf: "flex-start",
		flex: 1,
	},
	pickerInputAndroid: {
		color: 'black',
		fontWeight: '700',
		fontSize: 18,
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

export default CollectionHistory;
