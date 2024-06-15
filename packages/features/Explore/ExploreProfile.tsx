import type { FC } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Comment, Heart } from '@peakee/icons';
import type { PublicUserProfile, UserExplore } from '@peakee/types';
import { Avatar } from '@peakee/ui';

interface Props {
	profile: PublicUserProfile;
	explore: UserExplore;
}

const ExploreProfile: FC<Props> = ({ profile, explore }) => {
	return (
		<View style={styles.container}>
			<View style={styles.leftCol}>
				<View style={styles.avatarContainer}>
					<TouchableOpacity>
						<Avatar source={{ uri: profile.imageURL }} size={60} />
					</TouchableOpacity>
					<View style={styles.heartCount}>
						<Heart color="#D10C0F" size={10} />
						<Text>{explore.like | 0}</Text>
					</View>
				</View>
				<View style={styles.infoContainer}>
					<View style={{ ...styles.infoHeader }}>
						<Text
							style={styles.name}
							ellipsizeMode="tail"
							numberOfLines={1}
						>
							{explore.name}
						</Text>
					</View>
					<View style={{}}>
						<ScrollView
							horizontal
							scrollEnabled
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={[
								styles.flexRow,
								styles.scrollRow,
							]}
						>
							{explore.learnings.map((lang, idx) => {
								return (
									<View
										style={styles.languageContainer}
										key={idx}
									>
										<Text style={styles.languageText}>
											{lang}
										</Text>
									</View>
								);
							})}
						</ScrollView>
					</View>

					<View>
						<ScrollView
							horizontal
							scrollEnabled
							showsHorizontalScrollIndicator={false}
							contentContainerStyle={{
								...styles.flexRow,
								...styles.scrollRow,
							}}
						>
							<Text style={styles.infoText}>{explore.major}</Text>
							<Text style={styles.infoText}>-</Text>
							<Text style={styles.infoText}>
								{explore.interests?.map((it, idx) => {
									return idx + 1 ==
										explore.interests?.length ? (
										<Text key={idx}>{it}</Text>
									) : (
										<Text key={idx}>{it}, </Text>
									);
								})}
							</Text>
						</ScrollView>
					</View>
				</View>
			</View>
			<TouchableOpacity style={styles.chatButton}>
				<Comment color="#fea91a" size={12} />
				<Text style={styles.chatButtonText}>Chat</Text>
			</TouchableOpacity>
		</View>
	);
};
export default ExploreProfile;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: 90,
		gap: 10,
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1.5,
		paddingBottom: 10,
		borderColor: '#F5F4F4',
		paddingHorizontal: 10,
	},
	leftCol: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
		gap: 10,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	avatarContainer: {
		display: 'flex',
		height: '100%',
		gap: 7,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heartCount: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		justifyContent: 'center',
	},
	infoContainer: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		flex: 1,
		gap: 5,
		justifyContent: 'space-between',
	},
	infoHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		height: 'auto',
		maxWidth: '100%',
		alignItems: 'center',
		gap: 10,
	},
	name: {
		includeFontPadding: false,
		fontSize: 17,
		fontWeight: '600',
		flexShrink: 1,
		textTransform: 'capitalize',
	},
	flag: {
		borderRadius: 1,
		flexShrink: 1,
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	},
	scrollRow: {
		overflow: 'scroll',
	},
	languageContainer: {
		borderRadius: 11,
		borderColor: '#9AA3AE',
		borderWidth: 1,
		width: 65,
		height: 20,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	languageText: {
		color: '#4B5462',
		fontSize: 9,
		textTransform: 'capitalize',
	},
	infoText: {
		color: '#4B5462',
		fontSize: 12,
		textTransform: 'capitalize',
	},
	chatButton: {
		height: 35,
		fontSize: 20,
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		width: 90,
		gap: 6,
		borderRadius: 15,
		borderWidth: 0,
		backgroundColor: '#FEEDCC',
	},
	languagesBar: {
		width: 'auto',
		overflow: 'scroll',
	},
	chatButtonText: { color: '#fea91a', fontSize: 16 },
});
