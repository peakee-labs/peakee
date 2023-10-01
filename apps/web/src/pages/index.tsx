import { StyleSheet, Text, View } from 'react-native';
import { ChatBox } from '@peakee/chat';

import { app } from '../utils/firebase';

export default function Page(): JSX.Element {
	console.log(app);

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee web</Text>
			<ChatBox />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: '100vh' as never,
	},
	h1: {
		fontSize: 40,
		fontWeight: '500',
	},
});
