import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Input} from "reactstrap";

function TestChatting() {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const [input, setInput] = useState('');
    const [sendTo, setSendTo] = useState()

    const userInfo = useSelector(state => state.userInfo);

    useEffect(() => {
        let ws;

        const connectWebSocket = () => {
            console.log('WebSocket 연결 시도');
            ws = new WebSocket(`ws://localhost:8080/ws?userCode=${userInfo.userCode}`);

            ws.onopen = () => {
                console.log('WebSocket 연결 성공');
            };

            ws.onmessage = (event) => {
                console.log('메시지 수신:', event.data);
                setMessages(prevMessages => [...prevMessages, event.data]);
            };

            ws.onclose = (event) => {
                console.log('WebSocket 연결 종료:', event);
                setTimeout(() => {
                    console.log('WebSocket 재연결 시도');
                    connectWebSocket();
                }, 10000);
            };

            ws.onerror = (error) => {
                console.error('WebSocket 오류:', error);
            };

            setSocket(ws);
        };

        connectWebSocket();

        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, [userInfo]);

    const sendMessage = () => {
        if (socket && input) {
            const message = {
                from : userInfo.userCode,
                to : sendTo,
                message : input
            };
            socket.send(JSON.stringify(message));
            setInput('');
        }
    };

    return (
        <div style={styles.chatContainer}>
            <Input type='text' value={sendTo} onChange={e => setSendTo(e.target.value)} placeholder='누구에게 보낼꺼니'/>
            <div style={styles.chatWindow}>
                {messages.map((msg, index) => (
                    <div key={index} style={styles.message}>
                        {msg}
                    </div>
                ))}
            </div>
            <div style={styles.inputArea}>
                <input
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
};

export default TestChatting;
