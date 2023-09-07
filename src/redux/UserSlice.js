const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  auth: false,
  token: "",
  username: "",
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loginRedux: (state, action) => {
      state.auth = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    logoutRedux: (state, action) => {
      state.auth = false;
      state.token = "";
      state.username = "";
    },
  },
});

export const { loginRedux, logoutRedux } = UserSlice.actions;

export default UserSlice.reducer;
