



let TabsNavigator = ({
	messageAlert,
	pickupAlert,
	pickupAlertModal,
	redirect,
}) => {
	console.log(messageAlert, 'piuuu');

	let _watchId = useRef();

	let requestUserPermission = async () => {
		let authStatus = await firebase.messaging().requestPermission();

		firebase
			.messaging()
			.getToken()
			.then((token) => console.log(token, 'my tkk'));

		console.log(authStatus, 'auth');
		const enabled =
			authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === firebase.messaging.AuthorizationStatus.PROVISIONAL;
		if (enabled) {
			//		getFcmToken(); //<---- Add this
			console.log('Authorization status:', authStatus);
		}
	};
	PusherNative.logToConsole = false;

	let PusherClient = new PusherNative('b707e1c311cbd3a39c77', {
		cluster: 'eu',
		// wsHost: "{YOUR_HOST}",
		// wsPort: "6001",
		// enabledTransports: ["ws"],
		// forceTLS: false,
		auth: {
			headers: {
				Authorization: `Bearer ${store.getState().normal.token}`,
			},
		},

		authEndpoint: `${baseURL}/broadcasting/auth`,
	});

	let subscribeEcho = () => {
		let echo = new Echo({
			broadcaster: 'pusher',
			client: PusherClient,
		});

		// echo.channel("search-users").listen(".SEARCH_USERS", (e) => {
		//   console.log(e, "echo event");
		// });
		echo
			.private('notifications.' + store.getState().normal.userData.id)
			.listen('.SEND_NOTIFICATION', (e) => {
				console.log(e, 'new notification');
			});
		// echo.private("pickup-requests").listen(".ASSIGN_PICKUP", (e) => {
		//   console.log(e, "new assign Pickup-request");
		//   store.dispatch(updateNewRequestPop(true));
		//   setTimeout(() => {
		//     store.dispatch(updateNewRequestPop(false));
		//   }, 5000);
		// });
	};

	let watchLocation = async () => {
		let granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: 'Scrapays Location Permission',
				message: 'Scrapays App needs access to your location ',
			}
		);
		if (granted) {
			_watchId.current = Geolocation.watchPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					store.dispatch(saveLoginLocation({ lat: latitude, lng: longitude }));
					updateLocation(latitude, longitude);
				},
				(error) => {
					console.log(error);
				},
				{
					enableHighAccuracy: true,
					distanceFilter: 5,
					interval: 5000,
					fastestInterval: 5000,
				}
			);
		}
	};

	// useEffect(() => {
	//   getFcmToken();
	//   const unsubscribe = firebase
	//     .messaging()
	//     .onMessage(async (remoteMessage) => {
	//       Alert.alert(
	//         "A new FCM message arrived!",
	//         JSON.stringify(remoteMessage)
	//       );
	//     });

	//   return unsubscribe;
	// }, []);

	useEffect(() => {
		watchLocation();
		subscribeEcho();
		// requestUserPermission();
		// firebase.notifications().onNotification((notification) => {
		//   const { title, body } = notification;
		//   console.log(title, body);
		// });

		return () => {
			console.log(_watchId, 'watch id');
			Geolocation.clearWatch(_watchId.current);
			//  Geolocation.stopObserving();
		};
	}, []);

	console.log(messageAlert, 'pliiiiiii');
	return (
		<>
			{messageAlert && <NewMessage />}
			{pickupAlert && <NewPickup />}
			{pickupAlertModal.status === true && (
				<PickupAlertModal></PickupAlertModal>
			)}

			<Tab.Navigator
				tabBarOptions={{ style: { height: 70 }, activeTintColor: 'black' }}
			>
				<Tab.Screen
					//	name='CollectionHistory'
					options={({ navigation }) => ({
						tabBarButton: (props) => {
							return (
								<TouchableOpacity
									{...props}
									onPress={() => {
										navigation.navigate('Home', {
											screen: 'Dashboard',
										});
									}}
								/>
							);
						},
						tabBarLabel: 'Dashboard',
						tabBarIcon: ({ focused, color, size }) =>
							focused ? (
								<View
									style={{
										padding: 5,
										backgroundColor: 'rgba(241, 137, 33, 0.3)',
										borderRadius: 8,
									}}
								>
									<MaterialCommunityIcons
										name='view-dashboard'
										color='rgba(241, 137, 33, 0.8)'
										size={25}
									/>
								</View>
							) : (
								<MaterialCommunityIcons
									name='view-dashboard'
									color='rgba(241, 137, 33, 0.8)'
									size={25}
								/>
							),
					})}
					name='Home'
					component={MainNavigator}
				/>

				<Tab.Screen
					name='CollectionHistory'
					options={({ navigation }) => ({
						tabBarButton: (props) => {
							return (
								<TouchableOpacity
									{...props}
									onPress={() => {
										navigation.navigate('CollectionHistory', {
											screen: 'CollectionHistory',
										});
									}}
								/>
							);
						},
						tabBarLabel: 'Collection History',
						tabBarIcon: ({ focused, color, size }) =>
							focused ? (
								<View
									style={{
										padding: 5,
										backgroundColor: 'rgba(241, 137, 33, 0.3)',
										borderRadius: 8,
									}}
								>
									<MaterialCommunityIcons
										name='history'
										color='rgba(241, 137, 33, 0.8)'
										size={33}
									/>
								</View>
							) : (
								<MaterialCommunityIcons
									name='history'
									color='rgba(241, 137, 33, 0.8)'
									size={33}
								/>
							),
					})}
					component={CollectionStack}
				/>

				<Tab.Screen
					name='Pickup'
					options={{
						tabBarButton: (props) => {
							return <TouchableOpacity {...props} />;
						},
						tabBarIcon: ({ focused, color, size }) =>
							focused ? (
								<View
									style={{
										padding: 5,
										backgroundColor: 'rgba(241, 137, 33, 0.3)',
										borderRadius: 8,
									}}
								>
									<MaterialCommunityIcons
										name='bell'
										color='rgba(241, 137, 33, 0.8)'
										size={33}
									/>
								</View>
							) : (
								<MaterialCommunityIcons
									name='bell'
									color='rgba(241, 137, 33, 0.8)'
									size={33}
								/>
							),
					}}
					component={PickupScreen}
				/>
				<Tab.Screen
					name='Wallet'
					options={({ navigation }) => ({
						tabBarButton: (props) => {
							return (
								<TouchableOpacity
									{...props}
									onPress={() =>
										navigation.navigate('Wallet', { screen: 'wallet' })
									}
								/>
							);
						},
						tabBarIcon: ({ focused, color, size }) =>
							focused ? (
								<View
									style={{
										padding: 5,
										backgroundColor: 'rgba(241, 137, 33, 0.3)',
										borderRadius: 8,
									}}
								>
									<MaterialCommunityIcons
										name='wallet'
										color='rgba(241, 137, 33, 0.8)'
										size={33}
									/>
								</View>
							) : (
								<MaterialCommunityIcons
									name='wallet'
									color='rgba(241, 137, 33, 0.8)'
									size={33}
								/>
							),
					})}
					component={WalletNavigator}
				/>
			</Tab.Navigator>
		</>
	);
};

export default connect(mapStateToProps)(TabsNavigator);