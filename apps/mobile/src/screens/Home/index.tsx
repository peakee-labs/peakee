import { Button, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@peakee/app/state';
import { useNavigation } from '@react-navigation/native';

import { signOut } from '../../utils/auth';

import { AddFriend, Friends, Profile } from './components';

const HomeScreen = () => {
	const userProfile = useSelector((state: RootState) => state.user.profile);
	const friends = useSelector((state: RootState) => state.user.friends);
	const navigation = useNavigation();

	const handleSignOut = () => {
		signOut();
		navigation.navigate('SignIn' as never);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.h1}>Peakee</Text>

			{userProfile ? (
				<View style={styles.profileContainer}>
					<Profile
						id={userProfile.email}
						name={userProfile.fullName}
						image={userProfile.imageUrl}
					/>
					<Button onPress={handleSignOut} title="Sign out" />
				</View>
			) : (
				<Text>not sign-in</Text>
			)}

			<Text style={styles.h2}>Friends</Text>
			<View style={styles.friendsContainer}>
				<Friends profiles={friends || []} />
			</View>

			<AddFriend />

			<Text style={styles.h2}>Chat Rooms</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	profileContainer: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	signOutButton: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	friendsContainer: {
		padding: 10,
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
