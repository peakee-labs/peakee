import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';

import { uiStore } from '../state';
import { type ModalConfig, hideModalAction } from '../state/modal';

const ModalContainer = (config: ModalConfig) => {
	const { id, context, Component, onDismiss, ...bottomSheetConfig } = config;
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const handleDismiss = () => {
		onDismiss?.();
		uiStore.dispatch(hideModalAction({ id }));
	};

	useEffect(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={0}
			snapPoints={['60%', '80%']}
			onDismiss={handleDismiss}
			handleIndicatorStyle={styles.handleIndicator}
			backdropComponent={CustomBackdrop}
			{...bottomSheetConfig}
		>
			<Component context={context} />
		</BottomSheetModal>
	);
};

const CustomBackdrop: FC<BottomSheetBackdropProps> = (props) => {
	return (
		<BottomSheetBackdrop {...props} opacity={0.3} disappearsOnIndex={-1} />
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	handleIndicator: {
		height: 0,
	},
});
