import type { FC } from 'react';

import ChatRoomScreen from '../../screens/ChatRoom';
import { withAuth } from '../../utils/hoc';

const Chat: FC = () => {
	return <ChatRoomScreen />;
};

export default withAuth(Chat);
