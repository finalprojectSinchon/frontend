import { createSlice } from '@reduxjs/toolkit';
import {json} from "react-router-dom";

const initialState = {
    onlineStatus: {}, // 사용자 코드와 온라인 상태를 매핑하는 객체
};

const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        updateOnlineStatus(state, action) {
            const { userCode, status } = action.payload;
            state.onlineStatus[userCode] = status;
        },
        removeUserStatus(state, action) {
            const userCode = action.payload;
            delete state.onlineStatus[userCode];
        },
    },
});

export const { updateOnlineStatus, removeUserStatus } = statusSlice.actions;

export default statusSlice.reducer;
