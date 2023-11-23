import { showModal } from '@peakee/ui';
import { injectUtils } from '@peakee/utils';
import type { TranslateContext } from 'utils/modal/Translate';
import TranslateModal from 'utils/modal/Translate';

injectUtils({
	translate: (text, languages = 'en-vi') => {
		let snapIndex = 2;
		if (!text) {
			snapIndex = 3;
		}
		showModal<TranslateContext>({
			id: 'translate',
			index: snapIndex,
			snapPoints: ['20%', '40%', '60%', '70%', '90%'],
			useBackdrop: false,
			Component: TranslateModal,
			context: { text, languages },
		});
	},
});
