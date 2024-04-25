import type { JSX } from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import SignInFeature from '@peakee/app/features/SignIn';
import type { RootState } from '@peakee/app/state';

import { signIn } from './auth';

export const withAuth = (WrappedComponent: () => JSX.Element) => {
	const Authorized = () => {
		const userProfile = useSelector(
			(state: RootState) => state.user.profile,
		);

		return (
			<Fragment>
				{!userProfile ? (
					<SignInFeature onPressSignIn={signIn} />
				) : (
					<WrappedComponent />
				)}
			</Fragment>
		);
	};

	return Authorized;
};

export default withAuth;
