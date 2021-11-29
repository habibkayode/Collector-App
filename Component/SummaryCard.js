import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

const SummaryCard = (props) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				marginVertical: 10,
				width: '100%',
			}}
		>
			<Text style={{ fontSize: 18, fontWeight: 'bold', alignSelf: 'center' }}>
				{props.name}
			</Text>
			{props.image ? (
				<Image
					source={{ uri: props.image }}
					style={{
						width: 80,
						height: 80,
						borderRadius: 10,
					}}
				/>
			) : (
				<Text style={{ fontSize: 16, maxWidth: '50%' }}>{props.value}</Text>
			)}
		</View>
	);
};

export default SummaryCard;
