import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
	index: number;
};

export const Indicator: FC<Props> = () => {
	return <View style={styles.indicator} />;
};

export default Indicator;

const styles = StyleSheet.create({
	indicator: {
		height: 3,
		borderRadius: 20,
		backgroundColor: 'transparent',
		marginHorizontal: 14,
	},
	highlightIndicator: {
		backgroundColor: '#a7a7a7',
	},
});
