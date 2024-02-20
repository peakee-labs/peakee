import Config from 'react-native-config';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import { initOpenAIClient } from '@peakee/chat';
import { UIProvider } from '@peakee/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatRoomScreen from 'screens/ChatRoom';
import ExploreScreen from 'screens/explore';
import HomeScreen from 'screens/Home';
import SignInScreen from 'screens/SignIn';
import Splash from 'screens/Splash';

import 'utils/auth';
import 'react-native-url-polyfill/auto';

const Stack = createNativeStackNavigator();

initOpenAIClient(Config.OPENAI_API_KEY as string);

function App(): JSX.Element {
	return (
		<Provider store={store}>
			<UIProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: true }}>
						<Stack.Screen name="Splash" component={Splash} />
						<Stack.Screen name="SignIn" component={SignInScreen} />
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen
							name="ChatRoom"
							component={ChatRoomScreen}
						/>
						<Stack.Screen
							name="Explore"
							component={ExploreScreen}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</UIProvider>
		</Provider>
	);
}

export default App;
