import { type ReactNode, useRef } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {
	gestureHandlerRootHOC,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

type UIProviderProps = {
	children: ReactNode;
};

export const UIProvider = gestureHandlerRootHOC<UIProviderProps>(
	({ children }) => {
		const handlePresentModalPress = () => {
			bottomSheetModalRef.current?.present();
		};

		const bottomSheetModalRef = useRef<BottomSheetModal>(null);

		return (
			<GestureHandlerRootView style={styles.app}>
				<BottomSheetModalProvider>
					<SafeAreaView style={styles.app}>
						<Button
							title="Press me"
							onPress={handlePresentModalPress}
						/>

						{children}

						<BottomSheetModal
							ref={bottomSheetModalRef}
							index={1}
							snapPoints={['25%', '50%']}
						>
							<View>
								<Text>Awesome 🎉</Text>
							</View>
						</BottomSheetModal>
					</SafeAreaView>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		);
	},
);
export default UIProvider;

const styles = StyleSheet.create({
	app: { flex: 1 },
});
