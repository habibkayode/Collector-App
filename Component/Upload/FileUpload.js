import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { colors } from '../../Styles/colors';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import GeneralError from '../Error/GeneralError';

const FileUploadUi = (props) => {
	const [selectedImage, setSelectedImage] = useState();
	const pickAnImage = () => {
		console.log('object');
		launchImageLibrary({ mediaType: 'photo' }, (res) => {
			if (res.didCancel) {
				console.log('User cancelled image picker');
			} else if (res.error) {
				console.log('ImagePicker Error: ', res.error);
			}
			if (res.uri) {
				console.log(res.uri);
				setSelectedImage(res);
				props.changeFunc(res);
				// setPickedImage([...pickedImage, res]);
			}
		});
	};
	return (
		<>
			<TouchableOpacity
				style={{
					borderWidth: 1,
					borderColor: colors.primary,
					width: 180,
					height: 180,
					borderRadius: 20,
					alignSelf: 'center',
					marginTop: 20,
					alignItems: 'center',
					paddingVertical: 20,
					justifyContent: 'space-between',
				}}
				onPress={() => {
					pickAnImage();
				}}
			>
				{selectedImage ? (
					<Image
						source={{ uri: selectedImage.uri }}
						style={{
							width: 100,
							height: 100,
							borderRadius: 10,
						}}
					/>
				) : props.uri ? (
					<Image
						source={{ uri: props.uri }}
						style={{
							width: 100,
							height: 100,
							borderRadius: 10,
						}}
					/>
				) : (
					<View
						style={{
							//   padding: 40,
							backgroundColor: colors.grey1,
							justifyContent: 'center',
							alignItems: 'center',
							borderRadius: 80,
							width: 80,
							height: 80,
						}}
					>
						<Image source={require('../../assets/camera.png')} />
					</View>
				)}

				<View style={{ flexDirection: 'row' }}>
					<Image source={require('../../assets/upload.png')} />
					<Text
						style={{
							//  fontWeight: 'bold',
							fontSize: 16,
							marginLeft: 10,
							bottom: 2,
						}}
					>
						{selectedImage ? 'Change File' : ' Add File'}
					</Text>
				</View>
			</TouchableOpacity>
			<Text
				style={{
					fontWeight: 'bold',
					fontSize: 16,
					marginTop: 10,
					alignSelf: 'center',
				}}
			>
				{props.textName}
			</Text>
			{props.error && (
				<View style={{ alignSelf: 'center' }}>
					<GeneralError errorMsg='required' />
				</View>
			)}
		</>
	);
};

export default FileUploadUi;
