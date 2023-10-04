import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';

import { Profile } from './components';

const Home = () => {
	const userProfile = useSelector((state: RootState) => state.user.profile);

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee</Text>

			{userProfile ? (
				<Profile
					id={userProfile.email}
					name={userProfile.name}
					image={userProfile.imageUrl}
				/>
			) : (
				<Text>not sign-in</Text>
			)}
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	h1: {
		fontSize: 40,
		fontWeight: '700',
	},
});
