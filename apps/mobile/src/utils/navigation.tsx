import type { FC } from 'react';
import { Image } from 'react-native';
import { store } from '@peakee/app/state';
import { Book, Message, Noti, Users } from '@peakee/icons';
import type { IconProps } from '@peakee/icons/components/types';
import type { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import type {
	NavigatorScreenParams,
	RouteProp,
} from '@react-navigation/native';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace ReactNavigation {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Splash: undefined;
	SignIn: undefined;
	Onboarding: undefined;
	Home: NavigatorScreenParams<HomeTabParamList>;
};

export type HomeTabParamList = {
	Conversations: undefined;
	Explore: undefined;
	Practice: undefined;
	Notifications: undefined;
	Settings: undefined;
};

type TabOptionsFunction = (props: {
	route: RouteProp<HomeTabParamList>;
}) => MaterialTopTabNavigationOptions;

export const homeTabOptions: TabOptionsFunction = ({ route }) => {
	return {
		tabBarIcon: ({ focused }) => {
			let Icon: FC<IconProps>;
			if (route.name === 'Conversations') {
				Icon = Message;
			} else if (route.name === 'Explore') {
				Icon = Users;
			} else if (route.name === 'Practice') {
				Icon = Book;
			} else if (route.name === 'Notifications') {
				Icon = Noti;
			} else if (route.name === 'Settings') {
				return (
					<Image
						source={{
							uri: store().getState().user.profile?.imageURL,
						}}
						style={{
							top: -8,
							width: 40,
							height: 40,
							borderRadius: 30,
							borderWidth: 2,
							borderColor: focused ? '#FF7701' : 'transparent',
						}}
					/>
				);
			} else {
				throw Error('invalid route');
			}

			return (
				<Icon
					size={26}
					strokeWidth="2"
					color={focused ? '#FF7701' : '#979797'}
				/>
			);
		},
		tabBarShowLabel: false,
		tabBarItemStyle: {
			paddingVertical: 18,
		},
		tabBarIndicatorStyle: {
			backgroundColor: '#FF7701',
		},
		tabBarAndroidRipple: { color: '' },
		headerShown: false,
	};
};
