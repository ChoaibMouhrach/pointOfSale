import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

type InitialState = {
  value: null | User;
};

const initialState: InitialState = {
  value: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: { payload: User }) => {
      state.value = payload;
    },
    deleteUser: (state) => {
      state.value = null;
    },
  },
});

export const fetchUserConnected = (state: {
  user: InitialState;
}): boolean | null => !!state.user.value;
export const fetchUser = (state: { user: InitialState }): User | null =>
  state.user.value;
export const { setUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
