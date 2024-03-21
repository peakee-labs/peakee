import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FriendsFeature from '@peakee/app/features/Friends';
import { Quote } from '@peakee/icons';
import Image from 'next/image';

import { withAuth, withBottomNavigation } from '../utils/hoc';
import { useAuth } from '../utils/hooks';

const Home: FC = () => {
	const { user } = useAuth();

	return (
		<View style={styles.container}>
			<View style={styles.headerContainer}>
				<Image
					src={'/images/messages.png'}
					alt={'messages'}
					width={70}
					height={80}
				/>
				<View style={styles.headerTextContainer}>
					<Text style={styles.h3}>Chatting</Text>
					<View style={styles.quoteContainer}>
						<Quote color={'#FF9F00'} size={16} strokeWidth="1.5" />
						<Text style={styles.quoteText}>
							Hello {user?.name}! Welcome to Peakee world
						</Text>
					</View>
				</View>
			</View>
			<FriendsFeature />
		</View>
	);
};

export default withAuth(withBottomNavigation(Home));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 16,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	headerTextContainer: {
		gap: 4,
	},
	quoteContainer: {
		flexDirection: 'row',
		gap: 6,
		alignItems: 'center',
	},
	quoteText: {
		color: '#565656',
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
