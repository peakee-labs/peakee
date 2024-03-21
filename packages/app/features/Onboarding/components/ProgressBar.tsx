import { StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';

const dimension = Dimensions.get('window');

interface ProgressBarProps {
	current: number;
	max: number;
}
const ProgressBar = ({ current, max }: ProgressBarProps) => {
	return (
		<View style={styles.container}>
			{Array.from({ length: max }).map((_, idx) => {
				return idx == current ? (
					<View
						key={idx}
						style={{ ...styles.base, ...styles.active }}
					></View>
				) : (
					<View
						key={idx}
						style={{ ...styles.base, ...styles.inactive }}
					></View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: dimension.width * 0.8,
		alignSelf: 'center',
		height: 10,
		display: 'flex',
		gap: dimension.width * 0.02,
		flexDirection: 'row',
	},
	base: {
		flex: 1,
		height: 10,
		borderColor: '#000000',
		borderRadius: 10,
	},
	active: {
		backgroundColor: '#FF5A00',
	},
	inactive: {
		backgroundColor: '#E3E3E3',
	},
});
export default ProgressBar;
