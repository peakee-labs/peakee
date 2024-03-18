import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

export const useWrappedDimensions = () => {
	const [wrappedWidth, setWrappedWidth] = useState(0);
	const [wrappedHeight, setWrappedHeight] = useState(0);
	const { width, height } = useWindowDimensions();

	useEffect(() => {
		if (window) {
			setWrappedWidth(width);
			setWrappedHeight(height);
		}
	}, [width, height]);

	return { width: wrappedWidth, height: wrappedHeight };
};
