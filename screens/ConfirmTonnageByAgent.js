import moment from 'moment';
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getPendingPayment } from '../Api/api';
import Bgcover from '../Component/Bg/BackgroundCover';
import PaymentAccordion from '../Component/PaymentAccordion';
import { numberWithCommas } from '../helper/helper';

const ConfirmTonnageByAgent = (props) => {
	const [confirm, setConfirm] = useState(false);
	const [notConfirm, setNotCofirm] = useState(false);
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [refreshing, setRefreshing] = React.useState(false);
	const [reload, setRelaod] = useState(false);

	let getPendingPaymentFun = async () => {
		try {
			let response = await getPendingPayment();
			setData(response.data);
			console.log(false, 'kkkk');
			setLoading(false);
		} catch (error) {}
	};

	useEffect(() => {
		setLoading(true);
		getPendingPaymentFun();
	}, [reload]);

	React.useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', () => {
			setLoading(true);
			getPendingPaymentFun().then(() => {
				//        setLoading(false);
			});
		});

		// Return the function to unsubscribe from the event so it gets removed on unmount
		return unsubscribe;
	}, [props.navigation]);

	const onRefresh = (async) => {
		setRefreshing(true);
		getPendingPayment().then(() => {
			setRefreshing(false);
		});
	};

	return (
		<Bgcover name='Pending Payment'>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
				contentContainerStyle={{ minHeight: '100%' }}
			>
				{loading ? (
					<View
						style={{
							flex: 1,
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						}}
					>
						<Image
							source={require('../assets/loading-gif.gif')}
							style={{ width: 50, height: 50 }}
						></Image>
					</View>
				) : (
					<>
						{Object.keys(data).length === 0 ? (
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
									height: '100%',
								}}
							>
								<Text
									style={{
										fontWeight: 'bold',
										fontSize: 20,
										color: '#F18921',
									}}
								>
									... No Pending Payment yet
								</Text>
							</View>
						) : (
							<View style={{ marginHorizontal: 20 }}>
								{Object.keys(data).map((i) => {
									let actual = data[i];
									console.log(data, actual, 'actual');

									return (
										<>
											<>
												<Text style={styles.mainHeading}>Agent Name</Text>
												<View style={{ flexDirection: 'row', marginTop: 5 }}>
													<Text style={{ fontSize: 15 }}>
														{actual[0].agent.first_name}{' '}
														{actual[0].agent.last_name}
													</Text>
												</View>
												<Text style={styles.mainHeading}>
													Agent Phone number
												</Text>
												<View
													style={{ flexDirection: 'row', marginVertical: 5 }}
												>
													<Text>{actual[0].agent.phone}</Text>
												</View>
											</>
											<>
												{actual.map((i) => {
													return (
														<PaymentAccordion {...i} setRelaod={setRelaod} />
													);
												})}
											</>
										</>
									);
								})}
							</View>
						)}
					</>
				)}
			</ScrollView>
		</Bgcover>
	);
};

const styles = StyleSheet.create({
	mainHeading: { fontSize: 15, fontWeight: 'bold' },
	leftWrapper: { marginTop: 10, marginLeft: 20 },
});

export default ConfirmTonnageByAgent;
