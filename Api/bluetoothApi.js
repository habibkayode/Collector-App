import RNBluetoothClassic from 'react-native-bluetooth-classic';
import { store } from '../Redux/store';
import {
	updateBleCon,
	saveBonded,
	saveDiscoverList,
	saveDiscoveringState,
	updateConnected,
	updateSelectedDevice,
	updateBluetoothStatus,
} from '../Redux/actionCreator';
import { PermissionsAndroid } from 'react-native';

let connectionOptions = {
	CONNECTOR_TYPE: 'rfcomm',
	DELIMITER: '\r',
	READ_SIZE: 1024,
	DEVICE_CHARSET: 'utf-8',
};
const requestAccessFineLocationPermission = async () => {
	const granted = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		{
			title: 'Access fine location required for discovery',
			message:
				'In order to perform discovery, you must enable/allow ' +
				'fine location access.',
			buttonNeutral: 'Ask Me Later',
			buttonNegative: 'Cancel',
			buttonPositive: 'OK',
		}
	);
	return granted === PermissionsAndroid.RESULTS.GRANTED;
};

let onStateChanged = (state) => {
	console.log(
		'App::onStateChanged event used for onBluetoothEnabled and onBluetoothDisabled'
	);

	store.dispatch(updateBleCon(state));
	//props.updateBleCon(state);
};

let checkBluetoothEnabled = async () => {
	try {
		console.log('App::componentDidMount Checking bluetooth status');
		let enabled = await RNBluetoothClassic.isBluetoothEnabled();
		console.log(`App::componentDidMount Status: ${enabled}`);
		onStateChanged(enabled);
	} catch (error) {
		console.log('App::componentDidMount Status Error: ', error);
		onStateChanged(false);
	}
};

let startDiscovery = async () => {
	console.log('in here');
	store.dispatch(updateBluetoothStatus('scanning'));
	try {
		let granted = await requestAccessFineLocationPermission();
		if (!granted) {
			throw new Error('Access fine location was not granted');
		}
		store.dispatch(saveDiscoveringState(true));
		//props.saveDiscoveringState(true);
		console.log('here');
		//let devices = [...this.state.devices];
		try {
			let unpaired = await RNBluetoothClassic.startDiscovery();
			//props.saveDiscoverList(unpaired);
			// console.log(unpaired[0].name, "logins found devices");
			store.dispatch(saveDiscoverList(unpaired ? unpaired : []));
			console.log(unpaired);
		} finally {
			//props.saveDiscoveringState(false);
			store.dispatch(saveDiscoveringState(false));
		}
	} catch (err) {
		console.log(err, 'in discovering');

		//handle an error
	}
};

let connect = async () => {
	let selectedDevice = store.getState().bluetooth.selectedDevice;
	try {
		let connection = await selectedDevice.isConnected();
		if (!connection) {
			console.log(
				`Attempting connection to ${selectedDevice.address}`,
				new Date()
			);
			connection = await selectedDevice.connect(connectionOptions);
			console.log('Connection successful');
		} else {
			console.log(`Connected to ${selectedDevice.address}`);
		}
		//setConnected(connection);
		console.log(connection, 'connection variable');
		store.dispatch(updateConnected(connection));
	} catch (error) {
		store.dispatch(updateConnected(false));
		console.log(`Connection failed: ${error.message}`);
	}
};

let stateChangeEvent = () => {
	let enabledSubscription = RNBluetoothClassic.onBluetoothEnabled((event) =>
		onStateChanged(event.enabled)
	);
	let disabledSubscription = RNBluetoothClassic.onBluetoothDisabled((event) => {
		store.dispatch(updateSelectedDevice());
		store.dispatch(updateConnected(false));
		onStateChanged(event.enabled);
	});
	return {
		enabledSubscription,
		disabledSubscription,
	};
};

let onDeviceDisconnected = () => {
	let deviceSubscription = RNBluetoothClassic.onDeviceDisconnected((event) => {
		console.log('device disconnected');
		store.dispatch(updateSelectedDevice());
		store.dispatch(updateConnected(false));
	});
	return deviceSubscription;
};

let performRead = async () => {
	let selectedDevice = store.getState().bluetooth.selectedDevice;
	let values = [];
	try {
		console.log('Getting Reading form Scale');
		let available = await selectedDevice.available();
		console.log(`There is data available [${available}], attempting read`);

		if (available > 0) {
			for (let i = 0; i < available; i++) {
				// console.log(`reading ${i}th time`);
				let data = await selectedDevice.read();
				//  console.log(`Read data ${data.replace(/\s+/g, "")}`);
				if (data[1] === 'B') values[i] = data.replace(/\s+/g, '').slice(2, -1);
				// console.log(
				//   "data lenght",
				//   data.length,
				//   "each character",
				//   "checking",
				//   data[1] === "B",
				//   data.replace(/\s+/g, "").slice(2, -1)
				// );
			}
			return values[values.length - 1];
		}
	} catch (err) {
		console.log(err);
	}
};

let disconnect = async () => {
	let selectDevice = store.getState().bluetooth.selectedDevice;
	try {
		if (store.getState().bluetooth.connected) {
			disconnected = await selectDevice.disconnect();
			console.log('disconnect');
			store.dispatch(updateSelectedDevice());
			store.dispatch(updateConnected(false));
			console.log('Disconnected');
		}
	} catch (error) {
		console.log(error.message);
	}
};

export {
	connect,
	startDiscovery,
	checkBluetoothEnabled,
	stateChangeEvent,
	onDeviceDisconnected,
	performRead,
	disconnect,
};
