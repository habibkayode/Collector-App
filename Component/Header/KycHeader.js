import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../Styles/colors';

const KycHeader = (props) => {
	return (
		<View style={{ backgroundColor: colors.primary, width: '100%' }}>
			<Text
				style={{ color: 'white', padding: 5, fontWeight: 'bold', fontSize: 18 }}
			>
				{props.text}
			</Text>
		</View>
	);
};

export default KycHeader;
