import { injectUtils } from '@peakee/utils';

injectUtils({
	translate: (text, code) => {
		console.log('translate', text, code);
	},
});
