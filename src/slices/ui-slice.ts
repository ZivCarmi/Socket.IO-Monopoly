import { RootState } from "@/app/store";
import { PurchasableTile } from "@ziv-carmi/monopoly-utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UiState {
  gameLog: { id: number; message: string }[];
  selectedTile: PurchasableTile | null;
}

const initialState: UiState = {
  gameLog: [],
  selectedTile: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetUi: () => {
      return initialState;
    },
    writeLog: (state, action: PayloadAction<string>) => {
      state.gameLog.unshift({
        id: state.gameLog.length + 1,
        message: action.payload,
      });
    },
    setSelectedTile: (state, action: PayloadAction<PurchasableTile>) => {
      state.selectedTile = action.payload;
    },
  },
});

export const { resetUi, writeLog, setSelectedTile } = uiSlice.actions;

export const selectPurchasableTileIndex = (state: RootState) =>
  state.game.map.board.findIndex(
    (tile) => tile.name === state.ui.selectedTile?.name
  );

export default uiSlice.reducer;
