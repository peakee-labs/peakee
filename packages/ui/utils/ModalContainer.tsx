import { useEffect, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import type { ModalConfig } from '../state/modal';

const ModalContainer = (config: ModalConfig) => {
	const { id, Component, ...bottomSheetConfig } = config;
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	console.log('mount modal', id);

	useEffect(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<BottomSheetModal
			ref={bottomSheetModalRef}
			index={0}
			snapPoints={['60%', '80%']}
			{...bottomSheetConfig}
		>
			<Component />
		</BottomSheetModal>
	);
};

export default ModalContainer;
