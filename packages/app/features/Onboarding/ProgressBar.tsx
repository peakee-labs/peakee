import { StyleSheet, View } from 'react-native';

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
		width: '90%',
		alignSelf: 'center',
		height: 10,
		display: 'flex',
		gap: 10,
		flexDirection: 'row',
	},
	base: {
		flex: 1,
		height: 10,
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
