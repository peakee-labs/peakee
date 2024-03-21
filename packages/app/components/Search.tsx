import type { FC } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Search as SearchIcon } from '@peakee/icons';

type Props = {
	placeHolder?: string;
};

export const Search: FC<Props> = ({ placeHolder = 'Search' }) => {
	return (
		<View style={styles.container}>
			<SearchIcon color={'#8E8E93'} size={20} strokeWidth="2" />
			<TextInput
				style={styles.textInput}
				placeholder={placeHolder}
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
		borderRadius: 14,
		paddingVertical: 6,
		paddingHorizontal: 10,
		backgroundColor: '#f4f4f4',
		alignItems: 'center',
	},
	textInput: {
		flex: 1,
		lineHeight: 26,
		outlineStyle: 'none',
	},
});
