import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import { UIProvider } from '@peakee/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConversationScreen from 'screens/Conversation';
import ExploreScreen from 'screens/Explore';
import HomeScreen from 'screens/Home';
import OnboardingScreen from 'screens/Onboarding';
import SignInScreen from 'screens/SignIn';
import Splash from 'screens/Splash';
import type { RootStackParamList } from 'utils/navigation';

import 'utils/auth';
import 'react-native-url-polyfill/auto';

const Stack = createNativeStackNavigator<RootStackParamList>();

StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent');

function App(): JSX.Element {
	return (
		<Provider store={store()}>
			{/* this StatusBar as a node make animation lag */}
			{/* <StatusBar translucent backgroundColor={'transparent'} /> */}
			<UIProvider>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Splash" component={Splash} />
						<Stack.Screen name="SignIn" component={SignInScreen} />
						<Stack.Screen
							name="Onboarding"
							component={OnboardingScreen}
						/>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen
							name="Explore"
							component={ExploreScreen}
						/>
						<Stack.Screen
							name="Conversation"
							component={ConversationScreen}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</UIProvider>
		</Provider>
	);
}

export default App;
