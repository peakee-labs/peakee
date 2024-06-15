import type { FC } from 'react';
import { Text, View } from 'react-native';
import type { Explanation } from '@peakee/api';

import { type SharedProps, sharedStyles } from './shared';

type ExplanationItemProps = SharedProps & {
	explanation: Explanation;
};

export const ExplanationItem: FC<ExplanationItemProps> = ({
	explanation,
	itemContainerStyle,
	titleTextStyle,
	mainTextStyle,
	extendTextStyle,
}) => {
	const { title, main, extend } = explanation;
	return (
		<View style={[sharedStyles.itemContainer, itemContainerStyle]}>
			<Text style={[sharedStyles.titleTextStyle, titleTextStyle]}>
				{title}
			</Text>
			<Text style={[sharedStyles.mainTextStyle, mainTextStyle]}>
				{main}
			</Text>
			{extend && (
				<Text style={[sharedStyles.extendTextStyle, extendTextStyle]}>
					{extend}
				</Text>
			)}
		</View>
	);
};
