import { StyleSheet, Text, View } from 'react-native';
import ConversationsFeature from '@peakee/app/features/Conversations';
import FriendsFeature from '@peakee/app/features/Friends';
import ProfileFeature from '@peakee/app/features/Profile';
import { useNavigation } from '@react-navigation/native';
import DefaultContainer from 'components/DefaultContainer';
import LottieView from 'lottie-react-native';

import ChatLottie from './chat-lottie.json';

const HomeScreen = () => {
	const { navigate } = useNavigation();
	const handlePressAddFriend = () => {
		navigate('Home', { screen: 'Explore' });
	};

	return (
		<DefaultContainer>
			<Text style={styles.title}>Chatting</Text>
			<ProfileFeature style={styles.profileContainer} />
			<FriendsFeature onPressAddFriend={handlePressAddFriend} />
			<Text style={styles.sectionTitle}>Conversations</Text>
			<ConversationsFeature EmptyElement={EmptyConversations} />
		</DefaultContainer>
	);
};

const EmptyConversations = () => {
	return (
		<View style={styles.emptyContainer}>
			<LottieView
				style={styles.chatLottie}
				source={ChatLottie}
				autoPlay
				loop
			/>
			<Text style={styles.emptyText}>
				{"Let's add new friend and start \n chatting in English"}
			</Text>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	title: {
		fontWeight: '500',
		fontSize: 18,
		marginBottom: 20,
	},
	profileContainer: {
		marginBottom: 10,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '500',
		marginTop: 20,
		marginBottom: 10,
	},
	emptyContainer: {
		alignItems: 'center',
	},
	emptyText: {
		color: '#7b7a7a',
		position: 'absolute',
		top: 240,
		lineHeight: 24,
		textAlign: 'center',
	},
	chatLottie: {
		width: 300,
		height: 300,
	},
});
