import { StyleSheet, Text } from 'react-native';
import ConversationsFeature from '@peakee/app/features/Conversations';
import FriendsFeature from '@peakee/app/features/Friends';
import ProfileFeature from '@peakee/app/features/Profile';
import { useConversations } from '@peakee/app/hooks/useConversations';
import { useNavigation } from '@react-navigation/native';
import DefaultContainer from 'components/DefaultContainer';

const HomeScreen = () => {
	const { navigate } = useNavigation();
	const conversations = useConversations();
	const handlePressAddFriend = () => {
		navigate('Home', { screen: 'Explore' });
	};

	return (
		<DefaultContainer>
			<Text style={styles.title}>Chatting</Text>
			<ProfileFeature style={styles.profileContainer} />
			<FriendsFeature onPressAddFriend={handlePressAddFriend} />
			<Text style={styles.sectionTitle}>Conversations</Text>
			<ConversationsFeature />
		</DefaultContainer>
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
});
