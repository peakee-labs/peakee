import { StyleSheet } from 'react-native';

export const color = {
	titleText: '#3C4043',
	boxBorder: '#DADADA',
};

export const sharedStyles = StyleSheet.create({
	box: {
		borderWidth: 1.6,
		borderColor: color.boxBorder,
		borderRadius: 20,
	},
});
