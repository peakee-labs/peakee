import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import FriendRequests from './FriendRequests';

type Props = {
	style?: StyleProp<ViewStyle>;
};

const NotificationsFeature: FC<Props> = ({ style }) => {
	return (
		<View style={[styles.container, style]}>
			<FriendRequests />
		</View>
	);
};

export default NotificationsFeature;

const styles = StyleSheet.create({
	container: {},
});
