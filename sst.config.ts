import type { SSTConfig } from 'sst';
import type { StackContext } from 'sst/constructs';
import { NextjsSite } from 'sst/constructs';

export default {
	config() {
		return {
			name: 'peakee',
			region: 'ap-south-1',
		};
	},
	stacks(app) {
		const PeakeeApp = ({ stack }: StackContext) => {
			const peakeeApp = new NextjsSite(stack, 'app', {
				path: 'apps/web',
				customDomain: {
					domainName: 'app.peakee.co',
					hostedZone: 'peakee.co',
				},
			});

			stack.addOutputs({
				url: peakeeApp.url,
				customDomain: 'app.peakee.co',
			});
		};

		const PeakeeLanding = ({ stack }: StackContext) => {
			const peakeeLanding = new NextjsSite(stack, 'landing', {
				path: 'apps/landing',
				customDomain: 'peakee.co',
			});

			stack.addOutputs({
				url: peakeeLanding.url,
				customDomain: 'peakee.co',
			});
		};

		app.stack(PeakeeApp);
		app.stack(PeakeeLanding);
	},
} satisfies SSTConfig;
