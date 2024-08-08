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
import UserStatus from "src/components/apps/liveStatus/UserStatus.js";
import StatusProfileImg from "src/components/apps/liveStatus/StatusProfileImg.js";


const convertTimestampToDate = (timestamp) => {

    if (timestamp instanceof Timestamp) {

        return timestamp.toDate();
    } else if (typeof timestamp === 'string') {

        return new Date(timestamp);
    } else {

        return new Date(); // 기본값
    }
};


const fetchChatsByPattern = async (userCode, maxUserCode) => {
    const chatCollections = [];


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


        return latestChats;
    } catch (error) {

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
                const response = await api.get('/api/v1/contact');
                const fetchedUsers = response.data.data;
                setUsers(fetchedUsers);

                // 사용자 리스트를 가져온 후 채팅 데이터를 가져옴
                let lastUserCode = fetchedUsers[fetchedUsers.length-1].userCode;

                const chatData = await fetchChatsByPattern(userInfo.userCode, lastUserCode);
                setChat(chatData);

                setForm(true);
            } catch (error) {

                setForm(true);
            }
        };

        fetchUsers();
    }, [userInfo]);

    useEffect(() => {
        if (users.length > 0 && chat.length > 0) {
            const userMessages = {};

            chat.forEach(c => {


                const timestamp = convertTimestampToDate(c.timestamp);


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



            const updatedUsers = users
                .filter(user => user.userCode !== userInfo.userCode)
                .map(user => {
                    const userChat = userMessages[user.userCode];


                    return {
                        ...user,
                        lastMessage: userChat ? userChat.message : "최근 메시지가 없습니다.",
                        lastMessageDate: userChat ? userChat.timestamp : new Date('2000-01-01'),
                        unreadMessages: userChat ? userChat.unread : 0
                    };
                });

            updatedUsers.sort((a, b) => b.lastMessageDate - a.lastMessageDate);


            setUsers(updatedUsers);
        }
    }, [chat]);

    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatClick = (chat) => {

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
                            {form ? (
                                <ChatList
                                    className="chat-list"
                                    dataSource={users.map(user => {
                                        return {
                                            avatar: user.userImg ,
                                            alt: `${user.userName}_avatar`,
                                            title: (
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        {user.userName}
                                                        <UserStatus userCode={user.userCode} style={{ marginLeft: '0.5rem' }} />
                                                    </div>
                                                </div>
                                            ),
                                            subtitle: user.lastMessage || "최근 메시지가 없습니다.",
                                            date: user.lastMessageDate || new Date(),
                                            unread: user.unreadMessages || 0,
                                            userCode: user.userCode,
                                        };
                                    })}
                                    onClick={handleItemClick}
                                />
                            ) : (
                                <Spinner className="justify-content-center align-middle" />
                            )}
                        </>
                    }
                    rightContent={ selectedChat ? <ChatElements chatData={selectedChat} userInfo={userInfo} /> :
                        <h3 className="d-flex justify-content-center">채팅을 선택해주세요</h3>}
                />
            </CardBody>
        </Card>
    );
};

export default LiveChatting;
