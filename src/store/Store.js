import { configureStore } from '@reduxjs/toolkit';


import UserInfoReducer from './apps/login/userSlice';
import gateReducer from './apps/airplane/gateSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import MaintenanceReducer from './apps/maintenance/maintenanceSlice';
import ChkinCounterReducer from './apps/airplane/chkinCounterSlice';
import BaggageClaimReducer from './apps/airplane/baggageClaimSlice';



export const store = configureStore({
  reducer: {
    userInfo : UserInfoReducer,
    gates : gateReducer,
    customizer: CustomizerReducer,
    chkinCounters : ChkinCounterReducer,
    maintenances: MaintenanceReducer,
    baggageClaims : BaggageClaimReducer,
  

  },
});

export default store;
