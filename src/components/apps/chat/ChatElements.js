import React, {useEffect, useRef, useState} from 'react';
import { MessageList, Navbar } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import {Input, Button, Spinner} from 'reactstrap';
import './ChatElements.scss'; // 스타일을 위한 SCSS 파일
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from 'src/firebase.js';
import {
    clearMessages,
    connectWebSocket,
    disconnectWebSocket,
    sendWebSocketMessage,
} from "src/store/apps/websocket/WebSocketSlice.js";
import { useDispatch, useSelector } from "react-redux";
import UserStatus from "src/components/apps/liveStatus/UserStatus.js";
import { v4 as uuidv4 } from 'uuid';
const ChatElements = ({ chatData, userInfo }) => {

    const myUserCode = userInfo.userCode;
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const socketMessages = useSelector(state => state.websocket.messages);

    // 스크롤 락
    const messagesContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (userInfo && userInfo.userCode) {
            dispatch(connectWebSocket(userInfo.userCode));
        }

        // return () => {
        //     dispatch(disconnectWebSocket());
        // };
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
                            id: doc.id,
                            position: 'right',
                            type: 'text',
                            text: data.message,
                            date: new Date(data.timestamp),
                            avatar: userInfo.userImg,
                            title: '나'
                        };
                    });

                    const fetchedMessages2 = snapshot2.empty ? [] : snapshot2.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            position: 'left',
                            type: 'text',
                            text: data.message,
                            date: new Date(data.timestamp),
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

    useEffect(() => {
        if (socketMessages.length) {
            const newMessages = socketMessages.map(msg => {
                return {
                    id: uuidv4(),
                    position: msg.from === myUserCode ? 'right' : 'left',
                    type: 'text',
                    text: msg.message,
                    date: new Date(msg.timestamp),
                    avatar: msg.from === myUserCode ? userInfo.userImg : (chatData && chatData.avatar ? chatData.avatar : 'default-avatar.png'),
                    title: msg.from === myUserCode ? 'Me' : (chatData ? chatData.title : 'Unknown')
                };
            });

            setMessages(prevMessages => {
                const updatedMessages = [...prevMessages, ...newMessages];
                return updatedMessages;
            });

            dispatch(clearMessages());
        }
    }, [socketMessages, dispatch, chatData]);



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
                    id : uuidv4(),
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



    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const message = {
                type : 'CHAT_MESSAGE',
                to: chatData.userCode,
                from: userInfo.userCode,
                message: inputValue,
            };
            dispatch(sendWebSocketMessage(message));

            setMessages([
                ...messages,
                {
                    id: uuidv4(),
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-container">
            <Navbar
                left={
                    <img src={chatData ? chatData.avatar : 'https://via.placeholder.com/50'}
                         className="rounded-circle ms-2" width="50" alt="profile Img"/>
                }
                center={chatData ? <h3>{chatData.title}</h3> : null}
                right={
                    <UserStatus userCode={chatData ? chatData.userCode : <Spinner/>}/>}
                type={"light"}
                className="mb-3"
            />
            <div ref={messagesContainerRef} className="messages-container" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
            <MessageList
                className='message-list'
                lockable={false}
                toBottomHeight={'100%'}
                dataSource={messages}
            />
            </div>
            <div className="input-container">
                <Input
                    className="input-field"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="내용을 입력하세요"
                />
                <Button color="primary" onClick={handleSendMessage}>Send</Button>
            </div>
        </div>
    );
};

export default ChatElements;
