import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	ScrollView,
	TextInput,
	TouchableOpacity,
	Modal,
	ActivityIndicator,
	Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { connect } from 'react-redux';
import {
	getCommissionBalance,
	transferFromCommission,
	airtimeTransfer,
	walletToWalletTransfer,
	getPendingCommissionBalance,
	interWalletTransfer,
} from '../Api/api';
import Airtime from '../Component/AirtimeCard';
import AirtimeInputDetails from '../Component/AirtimeInputsDetails';
import BankCard from '../Component/BankCard';
import BankDetailsInput from '../Component/BankDetailsInputs';
import Bgcover from '../Component/Bg/BackgroundCover';
import PagaCard from '../Component/PagaCard';
import PagaDetailsInput from '../Component/PagaDetailsInput';
import WalletCard from '../Component/WalletCard';
import WalletDetailsInput from '../Component/WalletInputDetails';
import { numberWithCommas } from '../helper/helper';
import WalletDetailScreen from './WalletDetailScreen';

const mapStateToProps = (state) => {
	return {
		phoneNo: state.normal.userData.phone,
	};
};

const WithdrawCommission = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [showBigCheck, setBigCheck] = useState(false);
	const [togglePaymentType, setTogglePaymentType] = useState(false);
	const [paymentmethod, setPaymenthod] = useState('Bank');
	const [pinVaule, setPinValue] = useState();
	const [balance, setBalance] = useState();
	const [pendingComission, setPendingComission] = useState();
	const [loading, setLoading] = useState(true);
	let [bankData, setBankData] = useState();
	let [airtimeData, setAirtimeData] = useState();
	let [walletData, setWalletData] = useState();
	let pinRef = React.useRef();

	let getBalance = async () => {
		try {
			let commissionResponse = await getCommissionBalance();
			let pendingResopnse = await getPendingCommissionBalance();
			console.log(commissionResponse, 'commission resopnse');
			setBalance(commissionResponse.data.balance);
			setPendingComission(pendingResopnse.data.balance);

			setLoading(false);
		} catch (e) {
			console.log(e);
		}
	};
	1;
	useEffect(() => {
		getBalance();
	}, []);

	let makeTransfer = async () => {
		let payload = bankData;
		payload.pin = pinVaule;
		payload.phone = props.phoneNo;
		setPinValue();
		console.log(payload, 'final payload');

		try {
			let response = await transferFromCommission(payload);

			setBigCheck(true);

			setTimeout(() => {
				setBigCheck(false);
				setShowModal(false);
				props.navigation.navigate('wallet');
			}, 2000);
		} catch (e) {
			Alert.alert('Error', e.response.data.error);
		}
	};

	let buyAirtime = async () => {
		let payload = airtimeData;
		payload.pin = pinVaule;
		payload.phone = props.phoneNo;
		setPinValue();

		try {
			let response = await airtimeTransfer(payload);
			setBigCheck(true);

			setTimeout(() => {
				setBigCheck(false);
				setShowModal(false);
				props.navigation.navigate('wallet');
			}, 2000);
		} catch (e) {
			Alert.alert('Error', e.response.data.error);
		}
	};

	let sendToWallet = async () => {
		let walletFunc;
		let payload = { ...walletData };
		if (walletData.type === 'Main Account') {
			payload.mode = 'commission-to-cog';
			delete payload.beneficiary;
			walletFunc = interWalletTransfer;
		} else {
			walletFunc = walletToWalletTransfer;
		}
		delete payload.type;
		payload.phone = props.phoneNo;
		payload.pin = pinVaule;
		setPinValue();
		console.log(payload.mode, 'lloo');
		try {
			let response = await walletFunc(payload);
			setBigCheck(true);
			setTimeout(() => {
				setBigCheck(false);
				setShowModal(false);
				props.navigation.navigate('wallet');
			}, 2000);
		} catch (e) {
			Alert.alert('Error', e.response.data.error);
		}
	};

	return (
		<Bgcover name='Withdraw Commission'>
			{loading ? (
				<View
					style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
				>
					<Image
						source={require('../assets/loading-gif.gif')}
						style={{ width: 50, height: 50 }}
					></Image>
				</View>
			) : (
				<ScrollView>
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
							Commission
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
							{numberWithCommas(balance)}
						</Text>
						<View
							style={{ flexDirection: 'row', justifyContent: 'space-between' }}
						>
							<View
								style={{
									backgroundColor: 'white',
									padding: 10,
									borderRadius: 10,
								}}
							>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 10,
										fontWeight: 'bold',
									}}
								>
									Approved Commission
								</Text>
								<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
									{numberWithCommas(balance)}
								</Text>
							</View>
							<View
								style={{
									backgroundColor: 'white',
									padding: 10,
									borderRadius: 10,
								}}
							>
								<Text
									style={{
										textAlign: 'center',
										fontSize: 10,
										fontWeight: 'bold',
									}}
								>
									Pending Commission
								</Text>
								<Text
									style={{
										textAlign: 'center',
										fontWeight: 'bold',
										color: '#ED5A5A',
									}}
								>
									{numberWithCommas(pendingComission)}
								</Text>
							</View>
						</View>
					</View>

					<View style={{ marginHorizontal: 20 }}>
						<View
							style={{ flexDirection: 'row', justifyContent: 'space-between' }}
						>
							<BankCard
								disable={paymentmethod === 'Bank'}
								onPress={() => {
									setTogglePaymentType(false);
									setPaymenthod('Bank');
								}}
							/>
							<PagaCard
								disable={paymentmethod === 'Paga'}
								onPress={() => {
									// setTogglePaymentType(true);
									console.log('poo');
									//setPaymenthod("Paga");
								}}
							/>
						</View>
						<View
							style={{
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginVertical: 20,
							}}
						>
							<Airtime
								disable={paymentmethod === 'Airtime'}
								onPress={() => {
									setTogglePaymentType(false);
									setPaymenthod('Airtime');
								}}
							/>
							<WalletCard
								disable={paymentmethod === 'Wallet'}
								onPress={() => {
									setTogglePaymentType(true);
									setPaymenthod('Wallet');
								}}
							/>
						</View>
						{paymentmethod === 'Paga' && (
							<PagaDetailsInput
								sendFunc={() => {
									setShowModal(true);
								}}
							/>
						)}

						{paymentmethod === 'Bank' && (
							<BankDetailsInput
								sendFunc={(data) => {
									setShowModal(true);
									setBankData(data);
								}}
							/>
						)}

						{paymentmethod === 'Airtime' && (
							<AirtimeInputDetails
								sendFunc={(data) => {
									setShowModal(true);
									setAirtimeData(data);
								}}
							/>
						)}

						{paymentmethod === 'Wallet' && (
							<WalletDetailsInput
								sendFunc={(data) => {
									setShowModal(true);
									setWalletData(data);
								}}
							/>
						)}
					</View>
					<Modal
						visible={showModal}
						transparent={true}
						style={[
							{
								flex: 1,
							},
						]}
						onRequestClose={() => {
							setBigCheck(false);
							setShowModal(false);
						}}
					>
						<View
							style={{
								backgroundColor: 'rgba(0, 0, 0, 0.8)',
								flex: 1,
								justifyContent: 'center',
							}}
						>
							{showBigCheck ? (
								<>
									<View
										style={{
											width: 203,
											height: 203,
											borderColor: '#0A956A',
											borderWidth: 2,
											marginLeft: 'auto',
											marginRight: 'auto',
											borderRadius: 110,
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor: 'white',
										}}
									>
										<Image
											style={{ marginTop: 30 }}
											source={require('../assets/check-big.png')}
										/>
									</View>
									<Text
										style={{
											marginTop: 20,
											paddingHorizontal: 30,
											textAlign: 'center',
											fontSize: 16,
											lineHeight: 18,
											color: 'white',
											fontWeight: 'bold',
										}}
									>
										Transaction Completed
									</Text>
								</>
							) : (
								<View
									style={{
										marginHorizontal: 20,
										paddingVertical: 30,
										backgroundColor: 'white',
									}}
								>
									<Text
										style={{
											fontSize: 24,
											fontWeight: 'bold',
											marginBottom: 30,
											marginHorizontal: 20,
										}}
									>
										Input your wallet pin
									</Text>
									<View style={{ alignSelf: 'center', marginRight: 20 }}>
										<SmoothPinCodeInput
											ref={pinRef}
											value={pinVaule}
											onTextChange={(code) => setPinValue(code)}
											onFulfill={() => {}}
											cellStyle={{
												borderWidth: 2,
												borderColor: '#EF7700',
												marginLeft: 20,
											}}
											cellStyleFocused={{
												borderColor: 'darkorange',
												backgroundColor: 'orange',
											}}
										/>
										<TouchableOpacity
											style={styles.sendButton}
											onPress={() => {
												// setBigCheck(true);

												if (paymentmethod === 'Bank') {
													makeTransfer();
												}
												if (paymentmethod === 'Airtime') {
													buyAirtime();
												}
												if (paymentmethod === 'Wallet') {
													sendToWallet();
												}
											}}
										>
											<Text style={styles.sendButtonText}>Send</Text>
										</TouchableOpacity>
									</View>
								</View>
							)}
						</View>
					</Modal>
				</ScrollView>
			)}
		</Bgcover>
	);
};

const styles = StyleSheet.create({
	sendButton: {
		height: 55,
		backgroundColor: '#0A956A',
		borderRadius: 10,
		justifyContent: 'center',
		paddingHorizontal: 40,
		marginHorizontal: 20,
		marginTop: 40,
		alignSelf: 'center',
	},
	sendButtonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		textAlign: 'center',
	},
});

export default connect(mapStateToProps)(WithdrawCommission);
