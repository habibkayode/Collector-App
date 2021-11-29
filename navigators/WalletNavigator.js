import WalletScreen from './screens/WalletScreen_New';
import WithdrawScreen from './screens/WithdrawScreen';
import WithdrawCOGScreen from './screens/WithdrawCOGScreen';
import WithdrawComission from './screens/WithdrawCommission';
import WalletHistory from '../screens/WalletHistory';
import WalletDetailScreen from '../screens/WalletDetailScreen';
import WalletToWalletScreen from '../screens/WalletToWalletScreen';
import FundWalletScreen from '../screens/FundWalletScreen';

const WalletNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='wallet' component={WalletScreen} />
			<Stack.Screen name='Withdraw' component={WithdrawScreen} />
			<Stack.Screen name='WithdrawCOG' component={WithdrawCOGScreen} />
			<Stack.Screen name='WithdrawComission' component={WithdrawComission} />
			<Stack.Screen name='WalletHistory' component={WalletHistory} />
			<Stack.Screen name='WalletDetail' component={WalletDetailScreen} />
			<Stack.Screen name='WalletToWallet' component={WalletToWalletScreen} />
			<Stack.Screen name='FundWallet' component={FundWalletScreen} />
		</Stack.Navigator>
	);
};

export default WalletNavigator;
