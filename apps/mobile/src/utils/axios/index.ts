import { type RootState, store } from '@peakee/app/state';
import { setAuth } from '@peakee/app/state/auth';
import auth from '@react-native-firebase/auth';
import type { Dispatch, Store } from '@reduxjs/toolkit';
import axios from 'axios';
import promise from 'promise';

let _store: Store;
let _dispatch: Dispatch;
const axiosInstance = axios.create();

export const setupAxios = () => {
	_store = store;
	_dispatch = store.dispatch;

	axiosInstance.interceptors.request.use(
		async function (config) {
			const state = _store.getState() as RootState;
			let authUser = state.auth.authData;

			if (!authUser) {
				return promise.reject('user not logged in');
			}

			if (authUser.expiredAt < Date.now()) {
				console.log('refresh token');
				const token = await auth().currentUser?.getIdTokenResult();
				if (!token) {
					return promise.reject('user not logged in');
				}

				authUser = {
					token: token.token,
					expiredAt: new Date(token.expirationTime).getTime(),
				};
				_dispatch(setAuth(authUser));
			}

			config.headers.setAuthorization(`Bearer ${authUser?.token}`);
			return config;
		},
		function (error) {
			// Do something with request error
			return promise.reject(error);
		},
	);
};

setupAxios();

export default axiosInstance;
