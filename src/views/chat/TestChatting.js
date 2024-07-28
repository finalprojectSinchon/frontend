import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'reactstrap';
import { connectWebSocket, disconnectWebSocket } from 'src/store/apps/websocket/WebSocketSlice.js'

function TestChatting() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.websocket.messages);
    const socket = useSelector((state) => state.websocket.socket);
    const userInfo = useSelector((state) => state.userInfo);

    const userDetails = useSelector(
        (state) => state.userContact.users.find(user => user.userCode === state.userContact.userContentCode)
    );

    useEffect(() => {
        if (userInfo && userInfo.userCode) {
            dispatch(connectWebSocket(userInfo.userCode));
        }
        // return () => {
        //     dispatch(disconnectWebSocket());
        // };
    }, [dispatch, userInfo]);

    const sendMessage = () => {
        if (socket && input) {
            const message = {
                to : userDetails.userCode,
                from: userInfo.userCode,
                message: input,
            };
            socket.send(JSON.stringify(message));
            setInput('');
        }
    };

    return (
        <div style={styles.chatContainer}>
            <div style={styles.chatWindow}>
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} style={styles.message}>
                            {msg}
                        </div>
                    ))
                ) : (
                    <p style={styles.noMessages}>No messages yet</p>
                )}
            </div>
            <div style={styles.inputArea}>
                <Input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={styles.input}
                    placeholder="메시지를 입력하세요"
                />
                <button onClick={sendMessage} style={styles.button}>
                    전송
                </button>
            </div>
        </div>
    );
}

const styles = {
    chatContainer: {
        width: '500px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    chatWindow: {
        width: '100%',
        height: '400px',
        overflowY: 'auto',
        marginBottom: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '10px',
        boxSizing: 'border-box',
    },
    message: {
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '10px',
        backgroundColor: '#e0e0e0',
    },
    inputArea: {
        display: 'flex',
    },
    input: {
        flex: 1,
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid #ddd',
        marginRight: '10px',
        boxSizing: 'border-box',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
    },
    noMessages: {
        textAlign: 'center',
        color: '#888',
    },
};

export default TestChatting;
