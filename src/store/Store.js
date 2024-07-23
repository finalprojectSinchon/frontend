import { configureStore } from '@reduxjs/toolkit';


import UserInfoReducer from './apps/login/userSlice';
import gateReducer from './apps/airplane/gateSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import MaintenanceReducer from './apps/maintenance/maintenanceSlice';
import InspectionReducer from './apps/inspection/inspectionSlice';



export const store = configureStore({
  reducer: {
    userInfo : UserInfoReducer,
    gates : gateReducer,
    customizer: CustomizerReducer,

    maintenances: MaintenanceReducer,
    inspections :InspectionReducer
  

  },
});

export default store;
