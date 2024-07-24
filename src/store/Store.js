import { configureStore } from '@reduxjs/toolkit';


import UserInfoReducer from './apps/login/userSlice';
import gateReducer from './apps/airplane/gateSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import MaintenanceReducer from './apps/maintenance/maintenanceSlice';

import InspectionReducer from './apps/inspection/inspectionSlice';
import ChkinCounterReducer from './apps/airplane/chkinCounterSlice';
import BaggageClaimReducer from './apps/airplane/baggageClaimSlice';
import AirplaneReducer from './apps/airplane/airplaneSlice';

import UserContactReducer from './apps/userContact/UserContactSlice'


export const store = configureStore({
  reducer: {
    userInfo : UserInfoReducer,
    gates : gateReducer,
    customizer: CustomizerReducer,
    chkinCounters : ChkinCounterReducer,
    maintenances: MaintenanceReducer,
    inspections :InspectionReducer,
    baggageClaims : BaggageClaimReducer,
    airplanes : AirplaneReducer,
    userContact : UserContactReducer

  },
});

export default store;
