import type { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ConversationsFeature from '@peakee/features/Conversations';
import FriendsFeature from '@peakee/features/Friends';
import { Quote } from '@peakee/icons';
import type { Conversation, PublicUserProfile } from '@peakee/types';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { withAuth, withBottomNavigation } from '../utils/hoc';
import { useAuth } from '../utils/hooks';

const Home: FC = () => {
	const { user } = useAuth();
	const router = useRouter();
	const startConversationWithFriend = (friend: PublicUserProfile) => {
		router.push(`/chat/new-${friend.id}`);
	};
	const startConversation = (conversation: Conversation) => {
		router.push(`/chat/${conversation.id}`);
	};

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
					<Text style={styles.header}>Peakee Chat</Text>
					<View style={styles.quoteContainer}>
						<Quote color={'#FF9F00'} size={16} strokeWidth="1.5" />
						<Text style={styles.quoteText}>
							Hello {user?.name as string}! Welcome to Peakee
							world
						</Text>
					</View>
				</View>
			</View>

			<Text style={styles.subHeader}>Friends</Text>
			<FriendsFeature
				style={styles.friendsContainer}
				onPressFriend={startConversationWithFriend}
			/>

			<Text style={styles.subHeader}>Conversations</Text>
			<ConversationsFeature onPressConversation={startConversation} />
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
		gap: 10,
	},
	headerTextContainer: {
		flex: 1,
		gap: 4,
		marginTop: 18,
	},
	quoteContainer: {
		flex: 1,
		flexDirection: 'row',
		gap: 6,
	},
	quoteText: {
		flex: 1,
		color: '#565656',
	},
	friendsContainer: {
		marginBottom: 16,
	},
	header: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000000',
	},
	subHeader: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000000',
		marginBottom: 10,
	},
});
