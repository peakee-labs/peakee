import { Pressable, StyleSheet, Text } from 'react-native';
import CountryFlag from 'react-native-country-flag';

interface Props {
	isoCode: string; // ISO-3166 format
	name: string;
	onPress: () => void;
	isActive: boolean;
}

const FlagBar = ({ isActive, onPress, isoCode, name }: Props) => {
	let containerStyle;
	let textStyle;
	if (isActive) {
		containerStyle = { ...styles.container, ...styles.active };
		textStyle = { ...styles.name, ...styles.nameActive };
	} else {
		containerStyle = styles.container;
		textStyle = styles.name;
	}

	return (
		<Pressable onPress={onPress} style={containerStyle}>
			<CountryFlag size={25} isoCode={isoCode} style={styles.flag} />
			<Text style={textStyle}>{name}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '90%',
		alignSelf: 'center',
		height: 50,
		borderColor: '#000000',
		borderRadius: 10,
		borderWidth: 1.5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 10,
		gap: 10,
	},
	active: {
		borderColor: '#FF7670',
	},
	flag: {
		height: 30,
	},
	name: {
		textTransform: 'capitalize',
		fontSize: 17,
	},
	nameActive: {
		color: '#eeeeee',
	},
});

export default FlagBar;
