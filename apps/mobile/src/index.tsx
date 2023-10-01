import { StyleSheet, Text, View } from 'react-native';
import { ChatBox } from '@peakee/chat';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { signIn } from './utils/auth';

export function App(): JSX.Element {
	return (
		<View style={styles.app}>
			<View style={styles.container}>
				<Text style={styles.h1}>Hello Peakee</Text>
				<GoogleSigninButton
					size={GoogleSigninButton.Size.Wide}
					color={GoogleSigninButton.Color.Dark}
					onPress={signIn}
				/>
				<ChatBox />
			</View>
		</View>
	);
}

export default App;

const styles = StyleSheet.create({
	app: {
		flex: 1,
	},
	container: {
		flex: 1,
		paddingTop: 20,
	},
	h1: {
		fontSize: 50,
		fontWeight: '600',
	},
});
