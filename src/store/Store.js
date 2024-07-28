import { configureStore } from '@reduxjs/toolkit';
import UserInfoReducer from './apps/login/userSlice';
import gateReducer from './apps/airplane/gateSlice';
import CustomizerReducer from './customizer/CustomizerSlice';
import MaintenanceReducer from './apps/maintenance/maintenanceSlice';
import equipmentReducer from './apps/equipment/equipmentSlice';
import InspectionReducer from './apps/inspection/inspectionSlice';
import ChkinCounterReducer from './apps/airplane/chkinCounterSlice';
import BaggageClaimReducer from './apps/airplane/baggageClaimSlice';
import AirplaneReducer from './apps/airplane/airplaneSlice';
import UserContactReducer from './apps/userContact/UserContactSlice';
import websocketReducer from './apps/websocket/WebSocketSlice';
import {websocketMiddleware} from './apps/websocket/WebSocketMiddleware.js';

export const store = configureStore({
  reducer: {
    userInfo: UserInfoReducer,
    gates: gateReducer,
    customizer: CustomizerReducer,
    chkinCounters: ChkinCounterReducer,
    maintenances: MaintenanceReducer,
    equipments: equipmentReducer,
    inspections: InspectionReducer,
    baggageClaims: BaggageClaimReducer,
    airplanes: AirplaneReducer,
    userContact: UserContactReducer,
    websocket: websocketReducer, // 웹소켓 리듀서 추가
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(websocketMiddleware), // 웹소켓 미들웨어 추가
});

export default store;
