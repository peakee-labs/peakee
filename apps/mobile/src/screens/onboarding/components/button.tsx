import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps {
	onPress?: () => void;
	width: number;
	height: number;
}

const Button = ({ onPress, width, height }: ButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			style={{ ...styles.button, width: width, height: height }}
		>
			<Text style={styles.buttonText}>Start</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 60,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFFFFF',
		borderRadius: 100,
	},
	buttonText: {
		color: '#FF9F00',
		fontSize: 18,
		fontWeight: '500',
	},
});
export default Button;
