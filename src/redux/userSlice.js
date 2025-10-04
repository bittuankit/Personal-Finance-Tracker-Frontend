import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddUser: false,
  profile: JSON.parse(sessionStorage.getItem("user")) || null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setIsAddUser: (state, action) => {
      state.isAddUser = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload.user;
    },
  },
});

export const { setIsAddUser, setProfile } = userSlice.actions;

export default userSlice.reducer;
