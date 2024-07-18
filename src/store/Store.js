import { configureStore } from '@reduxjs/toolkit';


import UserInfoReducer from './apps/login/userSlice';
import gateReducer from './apps/airplane/gateSlice';
import CustomizerReducer from './customizer/CustomizerSlice';



export const store = configureStore({
  reducer: {
    userInfo : UserInfoReducer,
    gates : gateReducer,
    customizer: CustomizerReducer,
  
  },
});

export default store;
