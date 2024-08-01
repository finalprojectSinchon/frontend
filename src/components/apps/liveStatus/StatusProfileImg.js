import React from "react";
import {useSelector} from "react-redux";

const StatusProfileImg = ({userCode, src}) => {

    const onlineStatus = useSelector(state => state.status.onlineStatus);
    const isOnline = onlineStatus[userCode] === 'online';

    return (
        <>
            <div style={{
                position: 'relative',
                marginRight: '10px'
            }}>
                <img
                    src={src}
                    alt={`profileImg`}
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        border: `2px solid ${isOnline ? '#44b700' : '#ccc'}`,
                    }}
                />
                <span style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: isOnline ? '#44b700' : '#ccc',
                }}/>
            </div>
        </>
    )
}
export default StatusProfileImg;