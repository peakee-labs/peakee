import type { FC } from 'react';
import { useEffect } from 'react';
import SignInFeature from '@peakee/app/features/SignIn';
import { useRouter } from 'next/router';

import { signIn } from '../utils/auth';
import { useAuth } from '../utils/hooks';

const SignIn: FC = () => {
	const { user } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) router.push('/');
	}, [user]);

	return <SignInFeature onPressSignIn={signIn} />;
};

export default SignIn;
