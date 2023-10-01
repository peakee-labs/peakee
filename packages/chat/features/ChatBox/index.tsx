import { StyleSheet, Text, View } from 'react-native';

export const ChatBox = () => {
	return (
		<View style={styles.container}>
			<Text>Chat Box</Text>
		</View>
	);
};

export default ChatBox;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		borderWidth: 1,
		borderRadius: 10,
	},
});
