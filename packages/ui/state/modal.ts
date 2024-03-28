import type { FC } from 'react';
import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type ModalConfig<T extends object = object> = Omit<
	BottomSheetModalProps,
	'ref' | 'children'
> & {
	id: string;
	useBackdrop?: boolean;
	Component: FC<T>;
	props: T;
};

export type ModalState = {
	map: Record<string, ModalConfig>;
};

const initialState: ModalState = {
	map: {},
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		reset: () => initialState,
		showModalAction: (state, { payload }: PayloadAction<ModalConfig>) => {
			state.map[payload.id] = payload as never;
		},
		hideModalAction: (
			state,
			{ payload }: PayloadAction<{ id: string }>,
		) => {
			delete state.map[payload.id];
		},
	},
});

export const modalReducer = modalSlice.reducer;

export const { showModalAction, hideModalAction } = modalSlice.actions;
