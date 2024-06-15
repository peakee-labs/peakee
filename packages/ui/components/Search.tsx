import type { FC } from 'react';
import { Platform, StyleSheet, TextInput, View } from 'react-native';
import { Search as SearchIcon } from '@peakee/icons';

type Props = {
	placeHolder?: string;
	onChangeText?: (text: string) => void;
};

export const Search: FC<Props> = ({ placeHolder = 'Search', onChangeText }) => {
	return (
		<View style={styles.container}>
			<SearchIcon color={'#8E8E93'} size={20} strokeWidth="2" />
			<TextInput
				style={[
					styles.textInput,
					Platform.OS === 'web' && styles.textInputWeb,
				]}
				autoCapitalize={'none'}
				placeholder={placeHolder}
				onChangeText={onChangeText}
				placeholderTextColor={'#8E8E93'}
			/>
		</View>
	);
};

export default Search;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 6,
		borderRadius: 40,
		paddingVertical: 12,
		paddingHorizontal: 10,
		backgroundColor: '#f4f4f4',
		alignItems: 'center',
	},
	textInput: {
		flex: 1,
		paddingVertical: 0,
	},
	textInputWeb: {
		outlineStyle: 'none',
	} as never,
});
