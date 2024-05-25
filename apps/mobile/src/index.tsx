import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ModalProvider } from 'empty-modal';
import ConversationScreen from 'screens/Conversation';
import ExploreScreen from 'screens/Explore';
import HomeScreen from 'screens/Home';
import NotificationsScreen from 'screens/Notifications';
import OnboardingScreen from 'screens/Onboarding';
import PracticeScreen from 'screens/Practice';
import FlashcardScreen from 'screens/Practice/Flashcard';
import SettingsScreen from 'screens/Settings';
import SignInScreen from 'screens/SignIn';
import Splash from 'screens/Splash';
import type { PracticeParamList } from 'utils/navigation';
import {
	type HomeTabParamList,
	type RootStackParamList,
	homeTabOptions,
} from 'utils/navigation';

import 'utils/auth';
import 'react-native-url-polyfill/auto';

const Stack = createStackNavigator<RootStackParamList>();
const HomeTab = createMaterialTopTabNavigator<HomeTabParamList>();
const PracticeStack = createStackNavigator<PracticeParamList>();

if (Platform.OS === 'android') {
	StatusBar.setTranslucent(true);
	StatusBar.setBackgroundColor('transparent');
}

function App(): JSX.Element {
	return (
		<View style={styles.container}>
			<GestureHandlerRootView style={styles.gestureContainer}>
				{/* <ModalProvider> */}
				<SafeAreaProvider>
					{/* this StatusBar as a node make animation lag */}
					{/* <StatusBar translucent backgroundColor={'transparent'} /> */}
					{/* <UIProvider> */}
					<Provider store={store()}>
						<NavigationContainer>
							<Stack.Navigator
								screenOptions={{ headerShown: false }}
							>
								<Stack.Screen
									name="Splash"
									component={Splash}
								/>
								<Stack.Screen
									name="SignIn"
									component={SignInScreen}
								/>
								<Stack.Screen
									name="Onboarding"
									component={OnboardingScreen}
								/>
								<Stack.Screen
									name="Home"
									component={HomeTabStack}
								/>
								<Stack.Screen
									name="PracticeStack"
									component={RootPracticeStack}
								/>
								<Stack.Screen
									name="Conversation"
									component={ConversationScreen}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</Provider>
					{/* </UIProvider> */}
				</SafeAreaProvider>
				{/* </ModalProvider> */}
			</GestureHandlerRootView>
		</View>
	);
}

const HomeTabStack = () => {
	const insets = useSafeAreaInsets();

	return (
		<HomeTab.Navigator
			style={{ backgroundColor: '#fff' }}
			screenOptions={homeTabOptions({
				tabBarStyle: {
					elevation: 8, // for Android
					shadowOffset: {
						width: 0,
						height: -0.5, // for iOS
					},
					marginBottom: insets.bottom,
				},
			})}
			tabBarPosition="bottom"
		>
			<HomeTab.Screen name="Chat" component={HomeScreen} />
			<HomeTab.Screen name="Explore" component={ExploreScreen} />
			<HomeTab.Screen name="Practice" component={PracticeScreen} />
			<HomeTab.Screen
				name="Notifications"
				component={NotificationsScreen}
			/>
			<HomeTab.Screen name="Settings" component={SettingsScreen} />
		</HomeTab.Navigator>
	);
};

const RootPracticeStack = () => {
	return (
		<PracticeStack.Navigator screenOptions={{ headerShown: false }}>
			<PracticeStack.Screen
				name="Flashcard"
				component={FlashcardScreen}
			/>
		</PracticeStack.Navigator>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	gestureContainer: {
		flex: 1,
	},
});
