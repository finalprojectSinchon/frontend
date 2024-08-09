import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "src/store/apps/airplane/api.js";


export const fetchUsers = createAsyncThunk('user/info', async () => {
  const response = await api.get('/user-info');
  return response.data.data;
});

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
  isActive : '',
  authCode : '',
  userDepartment : '',
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
      state.isActive = action.payload.isActive;
      state.userDepartment = action.payload.userDepartment;
    },
    modifyUser: (state,action) => {
        state.userCode = action.payload.userCode;
        state.userName = action.payload.userName;
        state.userEmail = action.payload.userEmail;
        state.userPhone = action.payload.userPhone;
        state.userAddress = action.payload.userAddress;
        state.userAbout = action.payload.userAbout;
    },
    addAuthCode: (state, action) => {
      state.authCode = action.payload.password;
    }
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchUsers.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const userData = action.payload;
          state.userCode = userData.userCode;
          state.userId = userData.userId;
          state.userEmail = userData.userEmail;
          state.userPhone = userData.userPhone;
          state.userAddress = userData.userAddress;
          state.userName = userData.userName;
          state.userRole = userData.userRole;
          state.userAbout = userData.userAbout;
          state.userImg = userData.userImg;
          state.isActive = userData.isActive;
          state.userDepartment = userData.userDepartment;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
  }
});

export const { addUser, modifyUser,addAuthCode } = userInfoSlice.actions;

export default userInfoSlice.reducer;
