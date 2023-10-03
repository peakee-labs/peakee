import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatRoom from './screens/ChatRoom';
import Home from './screens/Home';
import SignIn from './screens/SignIn';

const Stack = createNativeStackNavigator();

export function App(): JSX.Element {
	return (
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
	);
}

export default App;

const styles = StyleSheet.create({
	app: {
		flex: 1,
	},
});
