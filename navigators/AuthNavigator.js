import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import IntroScreen from './screens/IntroScreen';
//import SplashScreen from "./screens/SplashScreen";
import FirstScreen from './screens/SplashScreen';
import SplashScreen from 'react-native-splash-screen';
import { Text } from 'react-native';

import changeUserTypeCode from './screens/ChangeUserTypeCode';
import SignInScreen from '../screens/SignInScreen';
import SignUpPinScreen from '../screens/SignUpPinScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CodePinScreen from '../screens/CodePinScreen';
import ForgetPassword from '../screens/ForgetPassword';
import ForgetPasswordCodePinScreen from '../screens/ForgetPasswordCodePinScreen';
import InputPassword from '../screens/InputPasswordScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
	const [loading, setLoading] = useState(true);
	const [logedIn, setLogedIn] = useState(false);
	let getStatus = async () => {
		let getStatus = await AsyncStorage.getItem('logedIn');

		console.log(getStatus, 'logins status');
		if (getStatus !== null && getStatus === 'true') {
			console.log(getStatus);
			setLogedIn(true);
		} else {
			setLogedIn(false);

			AsyncStorage.setItem('logedIn', 'true');
		}
	};
	useEffect(() => {
		getStatus().then(() => {
			setLoading(false);
		});
	}, []);

	useEffect(() => {
		if (!loading) SplashScreen.hide();
	}, [loading]);
	if (!loading) {
		return (
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName={logedIn ? 'Splash' : 'Intro'}
			>
				<Stack.Screen name='Intro' component={IntroScreen} />
				<Stack.Screen name='Splash' component={FirstScreen} />

				<Stack.Screen name='ChangeUserCode' component={changeUserTypeCode} />
				{/* <Stack.Screen name="Splash" component={WalletScreen} /> */}
				<Stack.Screen name='SignIn' component={SignInScreen} />
				<Stack.Screen name='SignUp' component={SignUpScreen} />
				<Stack.Screen name='SignUpPin' component={SignUpPinScreen} />
				<Stack.Screen name='CodePin' component={CodePinScreen} />
				<Stack.Screen name='ForgetPassword' component={ForgetPassword} />

				<Stack.Screen name='InputPassword' component={InputPassword} />

				<Stack.Screen
					name='ForgetPasswordCodePin'
					component={ForgetPasswordCodePinScreen}
				/>
			</Stack.Navigator>
		);
	} else {
		return <Text>Loading</Text>;
	}
};

export default AuthNavigator;
