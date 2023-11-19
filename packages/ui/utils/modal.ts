import { uiStore } from '../state';
import type { ModalConfig } from '../state/modal';
import { showModalAction } from '../state/modal';

export const showModal = (config: ModalConfig) => {
	uiStore.dispatch(showModalAction(config));
};
