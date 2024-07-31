import React from 'react';
import { useSelector } from 'react-redux';

const UserStatus = ({ userCode }) => {
    const onlineStatus = useSelector(state => state.status.onlineStatus);
    const isOnline = onlineStatus[userCode] === 'online';

    return (
        <div className="d-flex align-items-center">
            {/* 상태 표시기 */}
            <span
                className={`d-inline-block me-2`}
                style={{
                    width: '15px', // 원의 너비
                    height: '15px', // 원의 높이
                    borderRadius: '50%', // 원형 만들기
                    backgroundColor: isOnline ? '#28a745' : 'darkgray' // 온라인/오프라인 색상
                }}
            />
        </div>
    );
};

export default UserStatus;
