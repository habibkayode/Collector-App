import React, { useState } from 'react';
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
import { forgetPassword, resetPassword } from '../Api/authApi';
import { useRoute } from '@react-navigation/core';

const InputPassword = (props) => {
	let detail = useRoute().params;
	console.log(detail);

	const [data, setData] = useState({
		password: '',
		confirmPassword: '',
	});
	const [showError, setShowError] = useState(true);
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const handleSubmit = async () => {
		if (data.password < 8 && data.password !== data.confirmPassword) {
			return setShowError(true);
		}

		try {
			let response = await resetPassword({
				...detail,
				password: data.password,
				password_confirmation: data.confirmPassword,
			});

			Alert.alert(
				'congratulations',
				'Your password was changed successfully',
				[
					{
						text: 'OK',
						onPress: () => {
							props.navigation.navigate('Splash');
						},
						style: 'cancel',
					},

					{
						text: 'Cancel',
						onPress: () => {
							props.navigation.navigate('Splash');
						},
						style: 'cancel',
					},
				],
				{
					cancelable: false,
				}
			);
		} catch (error) {
			Alert.alert('Error', error.response?.data?.error);
			//	Alert.alert('Error');
		}
	};

	return (
		<ImageBackground
			source={require('../assets/background/bg1.jpg')}
			style={{ height: '100%', width: '100%' }}
		>
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
						props.navigation.goBack();
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

			<View style={styles.header}>
				<Text style={styles.text_header}>New Password</Text>
			</View>

			<Animatable.View animation='fadeInUpBig' style={[styles.footer]}>
				<View style={styles.action}>
					<MaterialIcons name='lock-outline' size={20} />
					<TextInput
						placeholder='Password'
						placeholderTextColor='#666666'
						secureTextEntry={secureTextEntry ? true : false}
						style={[styles.textInput]}
						autoCapitalize='none'
						onChangeText={(val) =>
							setData((prev) => ({ ...prev, password: val }))
						}
					/>
					<TouchableOpacity onPress={() => setSecureTextEntry((prev) => !prev)}>
						{secureTextEntry ? (
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
				{showError && data.password.length < 7 && (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>
							Password must be 8 characters long.
						</Text>
					</Animatable.View>
				)}

				<View style={styles.action}>
					<MaterialIcons name='lock-outline' size={20} />
					<TextInput
						placeholder='confirm password'
						placeholderTextColor='#666666'
						secureTextEntry={secureTextEntry ? true : false}
						style={[styles.textInput]}
						autoCapitalize='none'
						onChangeText={(val) =>
							setData((prev) => ({ ...prev, confirmPassword: val }))
						}
					/>
					<TouchableOpacity onPress={() => setSecureTextEntry((prev) => !prev)}>
						{secureTextEntry ? (
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
				{showError && data.password !== data.confirmPassword && (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>Password does not match</Text>
					</Animatable.View>
				)}

				<View style={styles.button}>
					<TouchableOpacity
						style={styles.signIn}
						onPress={() => {
							handleSubmit();
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
										fontWeight: 'bold',
									},
								]}
							>
								Send
							</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</Animatable.View>
		</ImageBackground>
	);
};

export default InputPassword;

const styles = StyleSheet.create({
	action: {
		flexDirection: 'row',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#EF7700',
		paddingBottom: 5,
	},

	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},

	footer: {
		flex: 2.5,
		paddingHorizontal: 20,
		paddingVertical: 30,
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

	text_header: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 30,
	},
	text: {
		color: '#05375a',
		marginTop: 10,
		fontSize: 18,
	},

	header: {
		flex: 1.5,
		justifyContent: 'flex-end',
		marginTop: 50,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
});
