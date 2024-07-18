import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCode: null,
  userId: '',
  userPassword: null,
  userEmail: '',
  userPhone: '',
  userAddress: '',
  userName: '',
  userRole: '',
  userAbout : '',
  userImg : '',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    addUser: (state, action) => {
      // 상태를 직접 업데이트
      state.userCode = action.payload.userCode;
      state.userId = action.payload.userId;
      state.userPassword = action.payload.userPassword;
      state.userEmail = action.payload.userEmail;
      state.userPhone = action.payload.userPhone;
      state.userAddress = action.payload.userAddress;
      state.userName = action.payload.userName;
      state.userRole = action.payload.userRole;
      state.userAbout = action.payload.userAbout;
      state.userImg = action.payload.userImg;
    },
    modifyUser: (state,action) => {
        state.userCode = action.payload.userCode;
        state.userName = action.payload.userName;
        state.userEmail = action.payload.userEmail;
        state.userPhone = action.payload.userPhone;
        state.userAddress = action.payload.userAddress;
        state.userAbout = action.payload.userAbout;
    }
  }
});

export const { addUser, modifyUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;
