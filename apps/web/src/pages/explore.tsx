import type { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import ExploreFeature from '@peakee/app/features/Explore';

import { useWrappedDimensions } from '../utils/hooks';

const Explore: FC = () => {
	const { width } = useWrappedDimensions();

	const containerStyle =
		width < 500 ? styles.fullContainer : styles.boxContainer;

	return (
		<View style={containerStyle}>
			<ExploreFeature />
		</View>
	);
};

export default Explore;

const styles = StyleSheet.create({
	boxContainer: {
		paddingVertical: 100,
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 20,
		alignSelf: 'center',
		marginVertical: 'auto',
	},
	fullContainer: {
		flex: 1,
	},
});
