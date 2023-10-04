import { StyleSheet, Text, View } from 'react-native';

export const Friends = () => {
	return (
		<View style={styles.container}>
			<Text>Friend 1</Text>
			<Text>Friend 2</Text>
		</View>
	);
};

export default Friends;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
});
