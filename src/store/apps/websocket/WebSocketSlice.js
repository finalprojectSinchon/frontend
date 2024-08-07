// websocketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updateOnlineStatus, removeUserStatus } from "src/store/apps/websocket/StatusSlice.js";
import {useEffect} from "react";

let socket = null;

const initialState = {
    isConnected: false,
    messages: [],
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
        }
    },
});

export const { setConnected, receiveMessage, clearMessages } = websocketSlice.actions;

export const connectWebSocket = (userCode) => (dispatch) => {
    if (socket) {
        socket.close();
    }

    socket = new WebSocket(`ws://192.168.0.209:8080/ws?userCode=${userCode}`);

    socket.onopen = () => {
        console.log('WebSocket connected');
        dispatch(setConnected(true));
        socket.send(JSON.stringify({ type: 'REQUEST_ALL_STATUSES' }));
    };


    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received WebSocket message:", data);

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
        }

        dispatch(receiveMessage(data));
    };




    socket.onclose = () => {
        console.log('WebSocket disconnected');
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



export default websocketSlice.reducer;
