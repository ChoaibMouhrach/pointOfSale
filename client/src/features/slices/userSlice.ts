import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  value: null | any;
};

const initialState = {
  value: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.value = payload;
    },
    deleteUser: (state) => {
      state.value = null;
    },
    updateUser: (state, { payload }) => {
      const state_copy = { ...state };
      state_copy.value = { ...state_copy, ...payload };
      state = state_copy;
    },
  },
});

export const fetchConnected = (state: { user: InitialState }): any | null =>
  !!state.user.value;
export const fetchUser = (state: { user: InitialState }): any | null =>
  state.user.value;
export default userSlice.reducer;
