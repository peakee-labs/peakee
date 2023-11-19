import type { FC } from 'react';
import type { ImageSourcePropType, ImageStyle } from 'react-native';
import { Image } from 'react-native';

interface Props {
	source: ImageSourcePropType;
	size?: number;
}

export const Avatar: FC<Props> = ({ source, size }) => {
	const style: ImageStyle = {
		height: size || 40,
		width: size || 40,
		borderRadius: size ? size / 2 : 20,
	};

	return <Image style={style} source={source} />;
};

export default Avatar;
