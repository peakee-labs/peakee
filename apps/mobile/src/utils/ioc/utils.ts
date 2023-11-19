import { showModal } from '@peakee/ui';
import { injectUtils } from '@peakee/utils';
import TranslateModal from 'utils/modal/Translate';

injectUtils({
	translate: (text, code) => {
		console.log('translate', text, code);
		showModal({
			id: 'translate',
			Component: TranslateModal,
		});
	},
});
