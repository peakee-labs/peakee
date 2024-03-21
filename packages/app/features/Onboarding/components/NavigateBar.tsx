import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
const dimension = Dimensions.get('window');

interface NavigateBarProps {
	onNext?: () => void;
	onPrev?: () => void;
}
const NavigateBar = ({ onNext, onPrev }: NavigateBarProps) => {
	let prevStyle;
	if (!onPrev) {
		prevStyle = { ...styles.button, ...styles.disabled };
	} else {
		prevStyle = { ...styles.button };
	}

	let nextStyle;
	if (!onNext) {
		nextStyle = { ...styles.button, ...styles.disabled };
	} else {
		nextStyle = { ...styles.button };
	}
	return (
		<View style={styles.container}>
			<Pressable disabled={!onPrev} style={prevStyle} onPress={onPrev}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Pressable>

			<Pressable disabled={!onNext} style={nextStyle} onPress={onNext}>
				<FontAwesomeIcon icon={faArrowRight} />
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: dimension.width * 0.8,
		alignSelf: 'center',
		gap: 20,
	},

	button: {
		height: 60,
		width: 60,
		borderRadius: 100,
		backgroundColor: '#EEEEEE',
		justifyContent: 'center',
		alignItems: 'center',
	},
	disabled: {
		opacity: 0.5,
	},
});

export default NavigateBar;
