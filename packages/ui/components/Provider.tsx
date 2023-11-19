import { type ReactNode } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
	gestureHandlerRootHOC,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Provider as ReduxProvider } from 'react-redux';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { uiStore } from '../state';
import ModalManager from '../utils/ModalManager';

type UIProviderProps = {
	children: ReactNode;
};

export const UIProvider = gestureHandlerRootHOC<UIProviderProps>(
	({ children }) => {
		return (
			<GestureHandlerRootView style={styles.app}>
				<BottomSheetModalProvider>
					<SafeAreaView style={styles.app}>{children}</SafeAreaView>
					<ReduxProvider store={uiStore}>
						<ModalManager />
					</ReduxProvider>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		);
	},
);
export default UIProvider;

const styles = StyleSheet.create({
	app: { flex: 1 },
});
