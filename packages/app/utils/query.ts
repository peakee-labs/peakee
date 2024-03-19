import { getPublicProfileOfUser } from '../api';
import { setFriendProfile, store } from '../state';

/**
 * first check if this friend is queried in friends state
 * load the public profile if not, dispatch to store, return public profile
 */
export async function getFriendProfileWithState(id: string) {
	let friend = store.getState().user.friends[id];
	if (!friend) {
		const loadedProfile = await getPublicProfileOfUser(id);
		if (!loadedProfile) return;
		friend = loadedProfile;
		store.dispatch(setFriendProfile(friend));
	}

	return friend;
}
