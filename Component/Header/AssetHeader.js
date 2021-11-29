import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../Styles/colors';

const AssetHeader = (props) => {
	return (
		<Text style={{ fontWeight: 'bold', fontSize: 18, marginVertical: 10 }}>
			{props.text}
		</Text>
	);
};

export default AssetHeader;
