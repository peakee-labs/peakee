import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import type { UIState } from '../state';

import ModalContainer from './ModalContainer';

const ModalManager = () => {
	const modals = useSelector((state: UIState) => state.modal.map);

	return (
		<Fragment>
			{Object.values(modals).map((config) => {
				return <ModalContainer key={config.id} {...config} />;
			})}
		</Fragment>
	);
};

export default ModalManager;
