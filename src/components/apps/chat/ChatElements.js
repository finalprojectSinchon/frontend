import React, { useEffect, useState } from 'react';
import { MessageList, Navbar } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import {Input, Button, Spinner} from 'reactstrap';
import './ChatElements.scss'; // 스타일을 위한 SCSS 파일
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from 'src/firebase.js';
import { connectWebSocket, disconnectWebSocket } from "src/store/apps/websocket/WebSocketSlice.js";
import { useDispatch, useSelector } from "react-redux";
import UserStatus from "src/components/apps/liveStatus/UserStatus.js";

const ChatElements = ({ chatData, userInfo }) => {
    const myUserCode = userInfo.userCode;
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const socket = useSelector((state) => state.websocket.socket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo && userInfo.userCode) {
            dispatch(connectWebSocket(userInfo.userCode));
        }
        // Clean up on component unmount
        return () => {
            dispatch(disconnectWebSocket());
        };
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (chatData) {
            const fetchMessages = async () => {
                try {
                    const chatRef1 = collection(db, 'messages', `${myUserCode}_${chatData.userCode}`, 'chats');
                    const chatRef2 = collection(db, 'messages', `${chatData.userCode}_${myUserCode}`, 'chats');

                    const q1 = query(chatRef1, orderBy('timestamp', 'asc'));
                    const q2 = query(chatRef2, orderBy('timestamp', 'asc'));

                    const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

                    const fetchedMessages1 = snapshot1.empty ? [] : snapshot1.docs.map(doc => {
                        const data = doc.data();
                        return {
                            position: 'right',
                            type: 'text',
                            text: data.message,
                            date: new Date(data.timestamp.seconds * 1000),
                            avatar: chatData.avatar,
                            title: '나'
                        };
                    });

                    const fetchedMessages2 = snapshot2.empty ? [] : snapshot2.docs.map(doc => {
                        const data = doc.data();
                        return {
                            position: 'left',
                            type: 'text',
                            text: data.message,
                            date: new Date(data.timestamp.seconds * 1000),
                            avatar: chatData.avatar,
                            title: chatData.title
                        };
                    });

                    const allMessages = [...fetchedMessages1, ...fetchedMessages2];
                    allMessages.sort((a, b) => a.date - b.date);

                    setMessages(allMessages);
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            };

            fetchMessages();
        }
    }, [chatData, myUserCode]);



    const handleMessageReceived = (event) => {
        console.log("Received message:", event.data);
        try {
            const data = JSON.parse(event.data);
            console.log("Parsed data:", data);

            if (data && data.message && data.timestamp) {
                // `chatData`와 `userInfo`의 유효성 검사
                const messagePosition = data.from === myUserCode ? 'right' : 'left';
                const messageAvatar = data.from === myUserCode
                    ? userInfo.userImg
                    : (chatData && chatData.avatar ? chatData.avatar : 'default-avatar.png'); // 기본값 설정
                const messageTitle = data.from === myUserCode
                    ? 'Me'
                    : (chatData ? chatData.title : 'Unknown'); // 기본값 설정

                const newMessage = {
                    position: messagePosition,
                    type: 'text',
                    text: data.message,
                    date: new Date(data.timestamp), // 날짜 형식 확인
                    avatar: messageAvatar,
                    title: messageTitle
                };

                setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages, newMessage];
                    console.log("Updated messages:", updatedMessages);
                    return updatedMessages;
                });
            } else {
                throw new Error("Invalid message structure");
            }
        } catch (error) {
            console.error("Error processing received message:", error);
        }
    };


    useEffect(() => {
        // 상태가 업데이트 될 때마다 자동으로 호출됩니다.
        console.log("Messages updated:", messages);
    }, [messages]); // messages 배열이 변경될 때마다 호출됩니다.


    useEffect(() => {
        if (socket) {
            socket.addEventListener('message', handleMessageReceived);
            return () => {
                socket.removeEventListener('message', handleMessageReceived);
            };
        }
    }, [socket]);

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            if (socket) {
                const message = {
                    to: chatData.userCode,
                    from: userInfo.userCode,
                    message: inputValue,
                };
                socket.send(JSON.stringify(message));
            }

            setMessages([
                ...messages,
                {
                    position: 'right',
                    type: 'text',
                    text: inputValue,
                    date: new Date(), // 현재 시간
                    avatar: userInfo.userImg, // 사용자 avatar
                    title: 'Me'
                },
            ]);
            setInputValue(''); // 입력 필드 비우기
        }
    };

    return (
        <div className="chat-container">
            <Navbar
                left={
                    <img src={chatData ? chatData.avatar : 'https://via.placeholder.com/50'} className="rounded-circle ms-2" width="50" alt="profile Img"/>
                }
                center={chatData ? <h3>{chatData.title}</h3> : null}
                right={
                    <UserStatus userCode={chatData ? chatData.userCode : <Spinner/>}/>}
                type={"light"}
                className="mb-3"
            />
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={messages}
            />
            <div className="input-container">
                <Input
                    className="input-field"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="내용을 입력하세요"
                />
                <Button color="primary" onClick={handleSendMessage}>Send</Button>
            </div>
        </div>
    );
};

export default ChatElements;
