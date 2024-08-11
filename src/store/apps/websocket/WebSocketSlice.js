// websocketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updateOnlineStatus, removeUserStatus } from "src/store/apps/websocket/StatusSlice.js";

let socket = null;

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

export const connectWebSocket = (userCode) => (dispatch) => {
    if (socket) {
        socket.close();
    }

    socket = new WebSocket(`ws://localhost:8080/ws?userCode=${userCode}`);

    socket.onopen = () => {

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

        dispatch(setConnected(false));
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        dispatch(setConnected(false));
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
        console.error('WebSocket is not connected');
    }
};

export const sendSosAlert = (message) => (dispatch) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'SOS_ALERT', message }));
    } else {
        console.error('WebSocket is not connected');
    }
};



export default websocketSlice.reducer;
