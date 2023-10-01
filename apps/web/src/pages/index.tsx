import { StyleSheet, Text, View } from 'react-native';
import { ChatBox } from '@peakee/chat';
import { Button } from '@peakee/ui';

import { signIn } from '../utils/firebase';

export default function Page(): JSX.Element {
	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee web</Text>
			<Button
				style={{ marginBottom: 10 }}
				title="Sign in with Google"
				onPress={signIn}
			/>
			<ChatBox />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: '100vh' as never,
		padding: 10,
	},
	h1: {
		fontSize: 40,
		fontWeight: '500',
	},
});
