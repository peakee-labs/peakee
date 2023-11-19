import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { uiStore } from '../state';
import { type ModalConfig, hideModalAction } from '../state/modal';

const ModalContainer = (config: ModalConfig) => {
	const { id, Component, onDismiss, ...bottomSheetConfig } = config;
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
			{...bottomSheetConfig}
		>
			<Component />
		</BottomSheetModal>
	);
};

export default ModalContainer;

const styles = StyleSheet.create({
	handleIndicator: {
		height: 0,
	},
});
