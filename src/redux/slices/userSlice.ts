import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  auth: boolean;
  accessToken: string;
  refreshToken: string;
}

const initialState: UserState = {
  id: "",
  auth: false,
  accessToken: "",
  refreshToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.auth = action.payload.auth;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.id = "";
      state.auth = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
