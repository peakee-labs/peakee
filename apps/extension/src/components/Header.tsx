import { StyleSheet, Text, View } from 'react-native';
import { Link, useLocation } from 'react-router-dom';

export const AppHeader = () => {
	const location = useLocation();
	console.log(location);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Peakee development</Text>
			<Link style={{ textDecoration: 'none' }} to="/">
				<Text
					style={[
						styles.button,
						location.pathname === '/' && styles.active,
					]}
				>
					Index
				</Text>
			</Link>
			<Link style={{ textDecoration: 'none' }} to="/newtab">
				<Text
					style={[
						styles.button,
						location.pathname === '/newtab' && styles.active,
					]}
				>
					NewTab
				</Text>
			</Link>
			<Link style={{ textDecoration: 'none' }} to="/popup">
				<Text
					style={[
						styles.button,
						location.pathname === '/popup' && styles.active,
					]}
				>
					Popup
				</Text>
			</Link>
		</View>
	);
};

export default AppHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 20,
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#aaaaaa',
	},
	title: {
		fontWeight: '500',
	},
	button: {
		fontWeight: '600',
	},
	active: {
		color: '#FF9F00',
	},
});
