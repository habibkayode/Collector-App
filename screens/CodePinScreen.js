import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	StatusBar,
	ImageBackground,
	Image,
	Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useRoute } from '@react-navigation/core';
import { sendVerificationCodeAgain, verifyPhone } from '../Api/api';
import useCounter from '../utils/hooks/counterHooks';
import SendAgain from '../Component/SendAgain';

const CodePinScreen = ({ navigation, data }) => {
	let r = useRoute().params;
	let phoneNumber = r.phone;
	const [values, setValues] = useState();

	const [disable, setDisable] = useState(true);
	const pinInput = React.createRef();
	const pinInputConfirm = React.createRef();

	const handleSignUp = async () => {
		//  navigation.navigate("CodePin");

		verifyPhone({ phone: phoneNumber, code: values })
			.then(() => {
				Alert.alert(
					'congratulations',
					'You have been registered successfully',
					[
						{
							text: 'OK',
							onPress: () => {
								navigation.navigate('Splash');
							},
							style: 'cancel',
						},

						{
							text: 'Cancel',
							onPress: () => {
								navigation.navigate('Splash');
							},
							style: 'cancel',
						},
					],
					{
						cancelable: false,
					}
				);
			})
			.catch((e) => {
				Alert.alert('Error', e.response.data.error);
				console.log(e.response.data.error);
			});
	};

	return (
		<ImageBackground
			source={require('../assets/background/bg2.jpg')}
			style={{ height: '100%', width: '100%' }}
		>
			<StatusBar backgroundColor='#EF7700' barStyle='light-content' />
			<Animatable.View animation='fadeInUpBig' style={[styles.container]}>
				<Image source={require('../assets/Phone.png')} />
				<Text style={[styles.text, { marginTop: 30 }]}>
					Check your Phone or Email
				</Text>
				<Text style={styles.smallText}>We sent a special code</Text>
				<SmoothPinCodeInput
					ref={pinInput}
					codeLength={6}
					value={values}
					onFulfill={() => {
						setDisable(false);
					}}
					onTextChange={(code) => setValues(code)}
					cellStyle={{
						borderWidth: 2,
						borderColor: '#EF7700',
					}}
					cellStyleFocused={{
						borderColor: 'darkorange',
						backgroundColor: 'orange',
					}}
				/>

				<SendAgain sendFunc={() => sendVerificationCodeAgain(r.phone)} />

				<View style={styles.button}>
					<TouchableOpacity
						disabled={disable}
						style={styles.signUp}
						onPress={() => {
							handleSignUp();
						}}
					>
						<LinearGradient
							colors={['#EF7700', '#CB6500']}
							style={styles.signUp}
						>
							<Text
								style={[
									styles.textSign,
									{
										color: '#fff',
									},
								]}
							>
								Confirm
							</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</ImageBackground>
	);
};

export default CodePinScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 5,
	},
	smallText: { fontSize: 18, marginBottom: 30 },
	button: {
		alignItems: 'center',
		marginTop: 50,
	},
	signUp: {
		paddingHorizontal: 40,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold',
		//width: 100,
	},
});
