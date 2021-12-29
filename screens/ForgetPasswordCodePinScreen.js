import React, { useState } from 'react';
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
import SendAgain from '../Component/SendAgain';

const ForgetPasswordCodePinScreen = ({ navigation, data }) => {
	let phoneNumber = useRoute().params;
	console.log(phoneNumber, 'poo');
	const [values, setValues] = useState();
	//change
	const [disable, setDisable] = useState(false);
	const pinInput = React.createRef();
	const pinInputConfirm = React.createRef();

	const handleSignUp = async () => {
		navigation.navigate('InputPassword', { phone: phoneNumber, code: values });
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

				<SendAgain sendFunc={() => sendVerificationCodeAgain(phoneNumber)} />

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
								Next
							</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</ImageBackground>
	);
};

export default ForgetPasswordCodePinScreen;

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
