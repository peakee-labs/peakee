import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
} from 'react-native';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={backgroundStyle}
			>
				<Header />
				<View
					style={{
						backgroundColor: isDarkMode
							? Colors.black
							: Colors.white,
					}}
				>
					<Text style={styles.h1}>Peakee</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

export default App;

const styles = StyleSheet.create({
	h1: {
		fontSize: 50,
		fontWeight: '600',
	},
});
