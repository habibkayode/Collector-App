import React from 'react';
import { View, Text, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { styles } from '../../Styles/globalStyles';

const GeneralError = (props) => {
	return (
		<Animatable.View
			//  style={{marginBottom: 10}}
			animation='fadeInLeft'
			duration={500}
		>
			<Text style={styles.errorMsg}>{props.errorMsg}</Text>
		</Animatable.View>
	);
};

export default GeneralError;
