import type { ReactNode, Ref } from 'react';
import { forwardRef } from 'react';
import type { View } from 'react-native';

export type RefComponent<Props, ElementTag> = (
	props: Props,
	ref: Ref<ElementTag>,
) => ReactNode;

export const withForwardRef = <Props, ElementTag = View>(
	Component: RefComponent<Props, ElementTag>,
) => {
	return forwardRef<ElementTag, Props>(Component);
};
