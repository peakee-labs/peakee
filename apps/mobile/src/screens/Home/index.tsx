import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';

import { AddFriend, Friends, Profile } from './components';

const Home = () => {
	const userProfile = useSelector((state: RootState) => state.user.profile);
	const friends = useSelector((state: RootState) => state.user.friends);

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee</Text>

			{userProfile ? (
				<Profile
					id={userProfile.email}
					name={userProfile.fullName}
					image={userProfile.imageUrl}
				/>
			) : (
				<Text>not sign-in</Text>
			)}

			<Text style={styles.h2}>Friends</Text>
			<Friends profiles={friends || []} />

			<Text style={styles.h3}>Add Friends</Text>
			<AddFriend />

			<Text style={styles.h2}>Chat Rooms</Text>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	h1: {
		fontSize: 40,
		fontWeight: '700',
		color: '#000000',
	},
	h2: {
		fontSize: 28,
		fontWeight: '600',
		color: '#000000',
	},
	h3: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000000',
	},
});
