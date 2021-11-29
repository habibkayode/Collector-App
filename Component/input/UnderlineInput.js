import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../Styles/globalStyles';
import GeneralError from '../Error/GeneralError';

const UnderLineInput = (props) => {
	console.log(props.error, 'ppp');
	return (
		<>
			<View style={styles.underLineInputWrapper}>
				<TextInput
					editable={props.editable}
					value={props.value}
					keyboardType={props.keyboardType ? props.keyboardType : 'default'}
					placeholder={props.placeholder ? props.placeholder : ''}
					placeholderTextColor='#666666'
					style={styles.underLineInput}
					autoCapitalize='none'
					onChangeText={(val) => props.onChangeText(val)}
					onFocus={props.onFocus}
				/>
			</View>
			{props.error === true ? (
				<GeneralError errorMsg={props.errorMsg ? props.errorMsg : 'required'} />
			) : null}
		</>
	);
};

export default UnderLineInput;
