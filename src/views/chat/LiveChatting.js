import React, { useEffect, useState } from 'react';
import { Card, CardBody, Spinner } from 'reactstrap';
import UserSearch from '../../components/apps/userContacts/UserSearch.js';
import TwoColumn from '../../components/twoColumn/TwoColumn.js';
import '../auth/userlist/UserContact.scss';
import ChatElements from "src/components/apps/chat/ChatElements.js";
import { ChatList } from "react-chat-elements";
import api from "src/store/apps/airplane/api.js";
import { db } from "src/firebase.js";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Timestamp } from 'firebase/firestore';

// 문자열 형식의 타임스탬프를 Date로 변환
const convertTimestampToDate = (timestamp) => {
    console.log('Received timestamp:', timestamp); // 로그 추가

    if (timestamp instanceof Timestamp) {
        console.log('Timestamp is an instance of Timestamp');
        return timestamp.toDate();
    } else if (typeof timestamp === 'string') {
        console.log('Timestamp is a string');
        return new Date(timestamp);
    } else {
        console.log('Timestamp is of an unknown type');
        return new Date(); // 기본값
    }
};

// 특정 패턴의 문서 이름을 동적으로 가져오는 함수
const fetchChatsByPattern = async (userCode, maxUserCode) => {
    const chatCollections = [];
    console.log('Max user code:', maxUserCode);

    try {
        for (let i = 1; i <= maxUserCode; i++) {
            chatCollections.push(`${userCode}_${i}`);
            chatCollections.push(`${i}_${userCode}`);
        }

        const latestChats = [];

        for (const collectionName of chatCollections) {
            const chatRef = collection(db, 'messages', collectionName, 'chats');
            const q = query(chatRef, orderBy('timestamp', 'desc'), limit(1));
            const snapshot = await getDocs(q);

            if (!snapshot.empty) {
                const latestMessage = snapshot.docs[0].data();
                latestChats.push({
                    ...latestMessage,
                    collectionName
                });
            }
        }

        console.log('Fetched latestChats:', latestChats); // Debugging line
        return latestChats;
    } catch (error) {
        console.error("Error fetching chats:", error);
        throw error;
    }
};


const LiveChatting = () => {
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState([]);
    const [form, setForm] = useState(false);
    const userInfo = useSelector((state) => state.userInfo);

    useEffect(() => {
        // 사용자 리스트 가져오기
        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/v1/admin/contact');
                const fetchedUsers = response.data.data;
                setUsers(fetchedUsers);

                // 사용자 리스트를 가져온 후 채팅 데이터를 가져옴
                let lastUserCode = fetchedUsers[fetchedUsers.length-1].userCode;

                const chatData = await fetchChatsByPattern(userInfo.userCode, lastUserCode);
                setChat(chatData);
                console.log('Fetched chat data:', chatData); // 데이터 확인용 로그
                setForm(true); // 데이터가 로드된 후 form을 true로 설정
            } catch (error) {
                console.error("Error fetching users or chats:", error);
                setForm(true); // 에러가 발생하더라도 form을 true로 설정
            }
        };

        fetchUsers();
    }, [userInfo]);

    useEffect(() => {
        if (users.length > 0 && chat.length > 0) {
            const userMessages = {};

            chat.forEach(c => {
                console.log('Chat item:', c); // 각 채팅 항목을 확인

                const timestamp = convertTimestampToDate(c.timestamp);
                console.log('Converted timestamp:', timestamp);

                // 사용자가 보낸 메시지 처리
                if (!userMessages[c.to] || timestamp > userMessages[c.to].timestamp) {
                    userMessages[c.to] = {
                        message: c.message,
                        timestamp: timestamp,
                        unread: c.unread || 0
                    };
                }

                // 상대방이 보낸 메시지 처리
                if (!userMessages[c.from] || timestamp > userMessages[c.from].timestamp) {
                    userMessages[c.from] = {
                        message: c.message,
                        timestamp: timestamp,
                        unread: c.unread || 0
                    };
                }
            });

            console.log('userMessages:', userMessages); // userMessages 객체를 확인

            const updatedUsers = users
                .filter(user => user.userCode !== userInfo.userCode)
                .map(user => {
                    const userChat = userMessages[user.userCode];
                    console.log('User chat for', user.userCode, ':', userChat); // 각 사용자의 채팅 정보 확인

                    return {
                        ...user,
                        lastMessage: userChat ? userChat.message : "최근 메시지가 없습니다.",
                        lastMessageDate: userChat ? userChat.timestamp : new Date('2000-01-01'),
                        unreadMessages: userChat ? userChat.unread : 0
                    };
                });

            updatedUsers.sort((a, b) => b.lastMessageDate - a.lastMessageDate);

            console.log('Updated users:', updatedUsers);
            setUsers(updatedUsers);
        }
    }, [chat]);

    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatClick = (chat) => {
        console.log('Selected chat:', chat);
        setSelectedChat(chat);
    };

    const handleItemClick = (item) => {
        handleChatClick(item);
    };

    return (
        <Card>
            <CardBody>
                <TwoColumn
                    leftContent={
                        <>
                            <UserSearch />
                            {form ? <ChatList
                                className="chat-list"
                                dataSource={users.map(user => ({
                                    avatar: user.userImg || 'https://via.placeholder.com/50',
                                    alt: `${user.userName}_avatar`,
                                    title: user.userName,
                                    subtitle: user.lastMessage || "최근 메시지가 없습니다.",
                                    date: user.lastMessageDate || new Date(),
                                    unread: user.unreadMessages || 0,
                                    userCode: user.userCode,
                                }))}
                                onClick={handleItemClick}
                            /> : <Spinner className="justify-content-center align-middle"/> }
                        </>
                    }
                    rightContent={<ChatElements chatData={selectedChat} userInfo={userInfo} />}
                />
            </CardBody>
        </Card>
    );
};

export default LiveChatting;
