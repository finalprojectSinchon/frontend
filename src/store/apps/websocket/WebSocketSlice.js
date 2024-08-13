// websocketSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updateOnlineStatus, removeUserStatus } from "src/store/apps/websocket/StatusSlice.js";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import {db} from "src/firebase.js";
import {useSelector} from "react-redux";
import { v4 as uuidv4 } from 'uuid';

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

    socket.onopen = async () => {

        dispatch(setConnected(true));
        socket.send(JSON.stringify({ type: 'REQUEST_ALL_STATUSES' }));
        let date = new Date();

        // Firestore에 로그인 로그 남기기
        try {
            await setDoc(doc(db, "usersLogin", `${String(userCode)} ${date}`), {
                lastLogin: date,  // 현재 시간을 Date 객체로 설정
                status: "online",
                userCode : String(userCode) // userCode를 문자열로 변환
            }, { merge: true });
            // console.log("User login time recorded successfully.");
        } catch (error) {
            console.error("Error recording login time:", error);
        }
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
