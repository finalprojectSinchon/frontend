import { createSlice } from '@reduxjs/toolkit';
import { updateOnlineStatus, removeUserStatus } from "src/store/apps/websocket/StatusSlice.js";

let socket = null;
let reconnectAttempts = 0;
const maxReconnectAttempts = 5; // 최대 재연결 시도 횟수
const initialReconnectDelay = 1000; // 1초

const initialState = {
    isConnected: false,
    messages: [],
    sosAlert : false,
    toastMessage : null
};

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        setConnected(state, action) {
            state.isConnected = action.payload;
        },
        receiveMessage(state, action) {
            state.messages.push(action.payload);
        },
        clearMessages(state) {
            state.messages = [];
        },
        receiveSosAlert(state, action) {
            state.sosAlert = action.payload;
        },
        clearSosAlert(state) {
            state.sosAlert = null;
        },
        toastMessage(state, action) {
            state.toastMessage = action.payload;
        }
    },
});

export const { setConnected, receiveMessage, clearMessages,  receiveSosAlert, clearSosAlert, toastMessage } = websocketSlice.actions;

const attemptReconnect = (dispatch, userCode) => {
    if (reconnectAttempts < maxReconnectAttempts) {
        const delay = initialReconnectDelay * Math.pow(2, reconnectAttempts); // 지수 백오프

        setTimeout(() => {
            reconnectAttempts++;
            console.log(`WebSocket 재연결 시도: ${reconnectAttempts}`);
            dispatch(connectWebSocket(userCode));
        }, delay);
    } else {
        alert("서버와의 연결이 불안정 합니다.")
        console.error('WebSocket 재연결 시도 횟수 초과');
    }
};

export const connectWebSocket = (userCode) => (dispatch) => {
    if (socket) {
        socket.close();
    }

    socket = new WebSocket(`ws://localhost:8080/ws?userCode=${userCode}`);

    socket.onopen = () => {
        console.log('WebSocket 연결됨');
        reconnectAttempts = 0; // 재연결 시도 초기화
        dispatch(setConnected(true));
        socket.send(JSON.stringify({ type: 'REQUEST_ALL_STATUSES' }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'USER_STATUS_UPDATE') {
            if (Array.isArray(data.statusUpdates)) {
                data.statusUpdates.forEach(update => {
                    dispatch(updateOnlineStatus({ userCode: update.userCode, status: update.status }));
                });
            } else if (typeof data.statusUpdates === 'object') {
                Object.entries(data.statusUpdates).forEach(([userCode, status]) => {
                    dispatch(updateOnlineStatus({ userCode, status }));
                });
            }
        } else if (data.type === 'USER_DISCONNECTED') {
            dispatch(removeUserStatus(data.userCode));
        } else if (data.type === 'SOS_ALERT') {
            dispatch(receiveSosAlert(data.message));
        }

        dispatch(receiveMessage(data));
        dispatch(toastMessage(data));
    };

    socket.onclose = () => {
        console.log('WebSocket 연결이 끊어졌습니다.');
        dispatch(setConnected(false));
        attemptReconnect(dispatch, userCode); // 자동 재연결 시도
    };

    socket.onerror = (error) => {
        console.error('WebSocket 에러:', error);
        dispatch(setConnected(false));
        socket.close(); // 에러 발생 시 소켓 닫기
    };

    return socket;
};

export const disconnectWebSocket = () => (dispatch) => {
    if (socket) {
        socket.close();
    }
    dispatch(setConnected(false));
};

export const sendWebSocketMessage = (message) => (dispatch) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket이 연결되어 있지 않습니다.');
    }
};

export const sendSosAlert = (message) => (dispatch) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'SOS_ALERT', message }));
    } else {
        console.error('WebSocket이 연결되어 있지 않습니다.');
    }
};

export default websocketSlice.reducer;
