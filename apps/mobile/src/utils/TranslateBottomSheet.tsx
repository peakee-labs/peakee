import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import type { Props } from '@peakee/app/features/TranslateBox';
import TranslateBox from '@peakee/app/features/TranslateBox';

export const TranslateBottomSheet: FC<Props> = ({ ...props }) => {
	return (
		<View style={styles.container}>
			<TranslateBox
				{...props}
				style={styles.translateContainer}
				contentFontSize={20}
			/>
		</View>
	);
};

export default TranslateBottomSheet;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		paddingVertical: 30,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: '#e7e7e7',
	},
	translateContainer: {},
});
