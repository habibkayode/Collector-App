import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	Platform,
	StyleSheet,
	StatusBar,
	Alert,
	ImageBackground,
	Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { checkEmail } from '../utils/check';
import { observer } from 'mobx-react-lite';
import { loginFun } from '../Api/authApi';
import { saveUserData } from '../Redux/actionCreator';
import { connect } from 'react-redux';
import * as BLEapi from '../Api/bluetoothApi';
import { updateDeviceToken } from '../Api/api';

const mapDispatchToProps = (dispatch) => {
	console.log('her');
	return {
		saveUserData: (data) => {
			dispatch(saveUserData(data));
		},
	};
};

//import authStore from '../store/authStore';
let authStore = {};
const SignInScreen = (props) => {
	let navigation = props.navigation;
	const [data, setData] = useState({
		phoneNumber: '',
		password: '',
		check_phoneNumberChange: false,
		secureTextEntry: true,
		isValidPhoneNumber: false,
		isValidPassword: false,
	});

	const phoneNumberChange = (val) => {
		if (val.length > 10) {
			setData({
				...data,
				phoneNumber: val,
				check_phoneNumber: true,
				isValidPhoneNumber: true,
			});
		} else {
			setData({
				...data,
				phoneNumber: val,
				check_phoneNumberChange: true,
				isValidPhoneNumber: false,
			});
		}
	};

	const handlePasswordChange = (val) => {
		if (val.trim().length >= 3) {
			setData({
				...data,
				password: val,
				isValidPassword: true,
			});
		} else {
			setData({
				...data,
				isValidPassword: false,
				password: val,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setData({
			...data,
			secureTextEntry: !data.secureTextEntry,
		});
	};

	const loginHandle = async () => {
		//  props.navigation.navigate("Tab", { screen: "Home" });

		if (
			!data.isValidPhoneNumber ||
			!data.isValidPassword ||
			data.phoneNumber.length == 0 ||
			data.password.length == 0
		) {
			console.log(data);
			Alert.alert('Wrong Input!', 'Phone Number or password field is invalid', [
				{ text: 'Okay' },
			]);
			return;
		}

		try {
			let resp = await loginFun({
				phone: data.phoneNumber,
				password: data.password,
			});
			console.log(resp, 'resp');
			if (resp.success) {
				console.log('here', resp.data.access_token);
				updateDeviceToken();
				// props.saveUserData({
				//   data: resp.data.user,
				//   token: resp.data.access_token,
				// });
				// props.navigation.navigate("Tab", { screen: "Home" });
			} else {
				Alert.alert('Error', resp.error);
				console.log(resp, 'error occur');
			}
		} catch (e) {
			console.log(e, 'diii');
			Alert.alert('Error', e.response?.data.error);
			if (
				e.response.data.error ===
				'Your phone number has not been verified, please verify it to login.'
			) {
				navigation.navigate('CodePin', { phone: data.phoneNumber });
			}
		}
	};

	return (
		<ImageBackground
			source={require('../assets/background/bg1.jpg')}
			style={{ height: '100%', width: '100%' }}
		>
			<ImageBackground
				source={require('../assets/bg-image-1.png')}
				resizeMode='contain'
				style={{
					flex: 1,
					position: 'absolute',
					width: '100%',
					height: '100%',
				}}
			/>
			<View
				style={{
					marginTop: StatusBar.currentHeight + 20,
					flexDirection: 'row',
					justifyContent: 'space-between',
					paddingHorizontal: 20,
				}}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
				>
					<MaterialCommunityIcons name='arrow-left' color='#6F6F6F' size={30} />
				</TouchableOpacity>
				<Image
					style={{
						alignSelf: 'flex-end',
					}}
					source={require('../assets/logo-small.png')}
				/>
			</View>

			<StatusBar backgroundColor='#EF7700' barStyle='light-content' />
			<View style={styles.header}>
				<Text style={styles.text_header}>Welcome!</Text>
				<Text style={styles.text}>
					Collect and aggregate recyclable and "Out-of-Use" items, make money
					while being environmentally freindly
				</Text>
			</View>
			<Animatable.View animation='fadeInUpBig' style={[styles.footer]}>
				<View style={styles.action}>
					<MaterialIcons name='person-outline' size={20} />
					<TextInput
						placeholder='Phone number '
						placeholderTextColor='#666666'
						style={[styles.textInput]}
						autoCapitalize='none'
						keyboardType='number-pad'
						onChangeText={(val) => phoneNumberChange(val)}
					/>
					{data.check_phoneNumberChange ? (
						<Animatable.View animation='bounceIn'>
							<MaterialCommunityIcons
								name='check-circle-outline'
								color='green'
								size={20}
							/>
						</Animatable.View>
					) : null}
				</View>
				{data.phoneNumber ? null : (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>Invalid Phone Number</Text>
					</Animatable.View>
				)}

				<View style={styles.action}>
					<MaterialIcons name='lock-outline' size={20} />
					<TextInput
						placeholder='Password'
						placeholderTextColor='#666666'
						secureTextEntry={data.secureTextEntry ? true : false}
						style={[styles.textInput]}
						autoCapitalize='none'
						onChangeText={(val) => handlePasswordChange(val)}
					/>
					<TouchableOpacity onPress={updateSecureTextEntry}>
						{data.secureTextEntry ? (
							<MaterialCommunityIcons
								name='eye-off-outline'
								color='grey'
								size={20}
							/>
						) : (
							<MaterialCommunityIcons
								name='eye-outline'
								color='grey'
								size={20}
							/>
						)}
					</TouchableOpacity>
				</View>
				{data.isValidPassword ? null : (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>
							Password must be 8 characters long.
						</Text>
					</Animatable.View>
				)}

				<TouchableOpacity
					onPress={() => {
						props.navigation.navigate('ForgetPassword');
					}}
				>
					<Text
						style={{
							marginTop: 15,
							color: 'black',
							textAlign: 'right',
							fontWeight: 'bold',
						}}
					>
						Forgot password?
					</Text>
				</TouchableOpacity>
				<View style={styles.button}>
					<TouchableOpacity
						style={styles.signIn}
						onPress={() => {
							loginHandle();
						}}
					>
						<LinearGradient
							colors={['#EF7700', '#CB6500']}
							style={styles.signIn}
						>
							<Text
								style={[
									styles.textSign,
									{
										color: '#fff',
									},
								]}
							>
								Sign In
							</Text>
						</LinearGradient>
					</TouchableOpacity>
					<Text
						onPress={() => props.navigation.navigate('SignUp')}
						style={{ marginTop: 10, fontSize: 15 }}
					>
						Don’t have an account? Click here to{' '}
						<Text style={{ color: '#EF7700' }}> Sign Up</Text>
					</Text>
				</View>
			</Animatable.View>
		</ImageBackground>
	);
};

export default connect(null, mapDispatchToProps)(SignInScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#009387',
	},
	header: {
		flex: 1.5,
		justifyContent: 'flex-end',
		marginTop: 50,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	footer: {
		flex: 2.5,
		paddingHorizontal: 20,
		paddingVertical: 30,
	},
	text_header: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 35,
	},
	text: {
		color: '#05375a',
		marginTop: 10,
		fontSize: 18,
	},
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#EF7700',
		paddingBottom: 5,
	},
	actionError: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FF0000',
		paddingBottom: 5,
	},
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},

	textInput: {
		flex: 1,
		marginTop: Platform.OS === 'ios' ? 0 : -12,
		paddingLeft: 10,
		color: '#05375a',
	},

	button: {
		alignItems: 'center',
		marginTop: 30,
	},
	signIn: {
		width: '100%',
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold',
	},
});
