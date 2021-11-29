import React, { useEffect } from 'react';
import {
	View,
	Text,
	Image,
	StyleSheet,
	StatusBar,
	ImageBackground,
	ScrollView,
	TouchableOpacity,
	BackHandler,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { updateLoggedIn } from '../../Redux/actionCreator';

const SubmitPage = (props) => {
	function handleBackButtonClick() {
		props.updateLoggedIn(false);

		return true;
	}

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
		return () => {
			BackHandler.removeEventListener(
				'hardwareBackPress',
				handleBackButtonClick
			);
		};
	}, []);

	return (
		<ImageBackground
			source={require('../../assets/background/bg1.jpg')}
			style={{ height: '100%', width: '100%' }}
		>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-end',
					paddingHorizontal: 20,
					marginBottom: 20,
					marginTop: 120,
				}}
			>
				<Image source={require('../../assets/menu2.png')} />
			</View>
			<View style={{}}>
				<View
					style={{
						width: 203,
						height: 203,
						borderColor: '#0A956A',
						borderWidth: 2,
						marginLeft: 'auto',
						marginRight: 'auto',
						marginTop: 20,
						borderRadius: 110,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Image
						style={{ marginTop: 30 }}
						source={require('../../assets/check-big.png')}
					/>
				</View>
				<Text
					style={{
						marginTop: 20,
						paddingHorizontal: 30,
						textAlign: 'center',
						fontSize: 28,
					}}
				>
					Thank you for completing the KYC
				</Text>
				<Text
					style={{
						marginTop: 20,
						paddingHorizontal: 30,
						textAlign: 'center',
					}}
				>
					Please note that after your KYC details have been approved you will
					receive a notification alert so that you can proceed to asset
					agreement signing
				</Text>
				{/* <TouchableOpacity
          style={{
            height: 55,
            backgroundColor: '#0A956A',
            borderRadius: 10,
            justifyContent: 'center',
            paddingHorizontal: 20,
            marginHorizontal: 20,
            marginTop: 40,
          }}
          onPress={() => {
            navigation.navigate('Dashboard');
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
            }}>
            Proceed to asset repayment agreement
          </Text>
        </TouchableOpacity> */}
			</View>
		</ImageBackground>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoggedIn: (state) => {
			dispatch(updateLoggedIn(state));
		},
		updateKycFormData: (data) => {
			dispatch(updateKycFormData(data));
		},
	};
};

export default connect(null, mapDispatchToProps)(SubmitPage);
