import { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();
const MainNavigator = () => {
	let redirect = store.getState().normal.redirect;
	return (
		<>
			<Stack.Navigator
				screenOptions={{
					headerShown: false,
				}}
				initialRouteName={redirect.status ? 'Message' : 'Dashboard'}
			>
				<Stack.Screen name='Dashboard' component={DashBoard} />
				{/* <Stack.Screen name="Pickup" component={PickupScreen} /> */}
				<Stack.Screen name='AcceptPickup' component={AcceptPickUp} />
				<Stack.Screen name='RejectPickup' component={Rejected} />
				<Stack.Screen name='CollectionLog' component={CollectionLogScreen} />
				<Stack.Screen name='MapScreen' component={MapScreen} />
				<Stack.Screen name='ProcessPickup' component={ProcessPickupScreen} />
				<Stack.Screen name='confirmation' component={ConfirmationScreen} />
				<Stack.Screen name='PaymentConfirm' component={PaymentConfirm} />
				<Stack.Screen name='BulkOfTake' component={BulkOfTakeScreen} />
				{/* <Stack.Screen name="Wallet" component={WalletScreen} /> */}
				{/* <Stack.Screen name="Withdraw" component={WithdrawScreen} /> */}
				<Stack.Screen name='SearchAgent' component={SearchAgentScreen} />
				{/* <Stack.Screen name="WithdrawCOG" component={WithdrawCOGScreen} /> */}
				<Stack.Screen name='AgentMap' component={AgentMapScreen} />
				<Stack.Screen name='CompositePrice' component={CompositePriceScreen} />
				<Stack.Screen name='Message' component={MessageScreen} />
				<Stack.Screen
					name='CollectionHistoryDetail'
					component={CollectionHistoryDetailScreen}
				/>
				{/* <Stack.Screen name="CollectionHistory" component={CollectionHistory} /> */}

				<Stack.Screen
					name='ConfirmTonnageByAgent'
					component={ConfirmTonnageByAgent}
				/>
				<Stack.Screen name='Received' component={RecievedScreen} />
				<Stack.Screen
					name='ConfirmationPage'
					component={ConfirmationPageScreen}
				/>
				{/* <Stack.Screen name="WithdrawComission" component={WithdrawComission} /> */}
			</Stack.Navigator>
		</>
	);
};

export default MainNavigator
