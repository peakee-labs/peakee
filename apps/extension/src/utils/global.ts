import { Text, TextInput } from 'react-native';

import '../../global.css';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const setDefaultProps = (Component: any, defaultProps: any) => {
	const componentRender = Component.render;
	if (!componentRender) {
		Component.defaultProps = defaultProps;
		return;
	}

	Component.render = (props: any, ref: any) => {
		props = {
			...defaultProps,
			...props,
			style: [defaultProps.style, props.style],
		};

		return componentRender.call(this, props, ref);
	};
};

setDefaultProps(Text, {
	style: {
		fontFamily: 'Lato',
	},
});
setDefaultProps(TextInput, {
	style: {
		fontFamily: 'Lato',
	},
});
