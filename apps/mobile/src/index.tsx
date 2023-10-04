import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatRoom from './screens/ChatRoom';
import Home from './screens/Home';
import SignIn from './screens/SignIn';

const Stack = createNativeStackNavigator();

export function App(): JSX.Element {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<SafeAreaView style={styles.app}>
					<Stack.Navigator>
						<Stack.Screen
							name="SignIn"
							component={SignIn}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Home"
							component={Home}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="ChatRoom"
							component={ChatRoom}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</SafeAreaView>
			</NavigationContainer>
		</Provider>
	);
}

export default App;

const styles = StyleSheet.create({
	app: {
		flex: 1,
	},
});
