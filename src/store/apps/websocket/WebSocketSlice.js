import { createSlice } from '@reduxjs/toolkit';
import {removeUserStatus, updateOnlineStatus} from "src/store/apps/websocket/StatusSlice.js";

// 초기 상태 설정
const initialState = {
    socket: null,
    messages: [],
};

// 웹소켓 슬라이스 생성
const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setSocket(state, action) {
            state.socket = action.payload;
        },
        receiveMessage(state, action) {
            state.messages.push(action.payload);
        },
        clearMessages(state) {
            state.messages = [];
        },
    },
});

export const { setSocket, receiveMessage, clearMessages } = websocketSlice.actions;

// WebSocket 연결 thunk
export const connectWebSocket = (userCode) => (dispatch) => {
    const socket = new WebSocket(`ws://localhost:8080/ws?userCode=${userCode}`);

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'USER_STATUS_UPDATE') {
            data.statusUpdates.forEach(update => {
                dispatch(updateOnlineStatus({ userCode: update.userCode, status: update.status }));
            });
        } else if (data.type === 'USER_DISCONNECTED') {
            dispatch(removeUserStatus(data.userCode));
        }
        // Handle other message types
    };


    socket.onclose = () => {
        console.log('WebSocket disconnected');
        dispatch(setSocket(null));
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    dispatch(setSocket(socket));
};

// WebSocket 연결 해제 thunk
export const disconnectWebSocket = () => (dispatch, getState) => {
    const { socket } = getState().websocket;
    if (socket) {
        socket.close();
    }
    dispatch(setSocket(null));
};

export default websocketSlice.reducer;
