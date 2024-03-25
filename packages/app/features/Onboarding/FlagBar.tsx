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
	if (isActive) {
		containerStyle = { ...styles.container, ...styles.active };
	} else {
		containerStyle = styles.container;
	}

	return (
		<Pressable onPress={onPress} style={containerStyle}>
			<CountryFlag isoCode={isoCode} size={30} style={styles.flag} />
			<Text style={styles.name}>{name}</Text>
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
		borderWidth: 2,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 10,
		gap: 10,
	},
	active: {
		borderColor: '#FF7670',
	},
	flag: {},
	name: {
		textTransform: 'capitalize',
		fontSize: 17,
	},
});

export default FlagBar;
