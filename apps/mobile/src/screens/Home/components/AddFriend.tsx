import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import { addFriend } from '@peakee/app/utils';

export const AddFriend = () => {
	const [friendEmail, setFriendEmail] = useState('');

	const handlePressAddFriend = () => {
		addFriend(friendEmail.toLowerCase());
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				value={friendEmail}
				onChangeText={setFriendEmail}
				placeholder="Type your friend's email"
				textContentType="emailAddress"
				autoCapitalize="none"
			></TextInput>
			<Button onPress={handlePressAddFriend} title="Add" />
		</View>
	);
};

export default AddFriend;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
	},
	input: {
		flex: 1,
		height: 40,
		borderWidth: 0.5,
		borderRadius: 12,
		paddingHorizontal: 10,
	},
});
