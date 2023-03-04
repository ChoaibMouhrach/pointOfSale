import { createSlice } from "@reduxjs/toolkit";
import { Settings } from "../../types/Settings";

const initialState: { value: Settings } = {
  value: {
    currency: "",
    company_name: "",
    vat: "",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, { payload }: { payload: Settings }) => {
      state.value = payload;
    },
  },
});

export const getSettings = (state: { settings: { value: Settings } }) => state.settings.value;
export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
