import { showModal } from '@peakee/ui';
import { injectUtils } from '@peakee/utils';
import type { TranslateContext } from 'utils/modal/Translate';
import TranslateModal from 'utils/modal/Translate';

injectUtils({
	translate: (text, languages) => {
		showModal<TranslateContext>({
			id: 'translate',
			Component: TranslateModal,
			context: { text, languages },
		});
	},
});
