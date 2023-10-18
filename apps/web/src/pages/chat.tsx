import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { withAuth } from '../utils/hoc';

const Chat: FC = () => {
	return (
		<View style={styles.container}>
			<Text>Chat</Text>
		</View>
	);
};

export default withAuth(Chat);

const styles = StyleSheet.create({
	container: {},
});
