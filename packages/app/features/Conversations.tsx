import { type FC, useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';

type ConversationInfo = {
	id: string;
	image: string;
	name: string;
	recentMessage: string;
	recentMessageTime: Date;
};

type Props = {
	conversations: ConversationInfo[];
	onPress: (id: string) => void;
};

const ConversationsFeature: FC<Props> = ({ conversations }) => {
	const renderItem = useCallback(({ item }: { item: ConversationInfo }) => {
		return (
			<View>
				<Text>{item.name}</Text>
			</View>
		);
	}, []);

	return <FlatList data={conversations} renderItem={renderItem} />;
};

export default ConversationsFeature;

// const styles = StyleSheet.create({});
