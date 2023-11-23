import { uiStore } from '../state';
import type { ModalConfig } from '../state/modal';
import { showModalAction } from '../state/modal';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export const showModal = <T extends object>(
	config: Optional<ModalConfig<T>, 'context'>,
) => {
	config.context = config.context ?? ({} as never);
	uiStore.dispatch(showModalAction(config as never));
};
