import React from 'react';
import { NavItem, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';

const UserListItem = ({ onClick, active, user, userColor, userDatef, onDeleteClick }) => (
    <NavItem className={`border-bottom cursor-pointer ${active === user.userCode ? 'bg-light' : ''}`}>
        <div onClick={onClick} className="d-flex align-items-center p-3">
            <img
                src={user.userImg}
                alt={`${user.userName}'s profile`}
                className="rounded-circle me-3"
                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
            />
            <div className="flex-grow-1">
                <h5 className="text-truncate noteText mb-0 mt-1">{user.userName || '이름없음'}</h5>
                <small className="text-muted">{user.userRole === 'ROLE_ADMIN' ? '관리자' : '직원'}</small>
                <div className="d-flex align-items-center mt-2">
                    <small>{userDatef !== 'Invalid Date' ? `소속 날짜: ${userDatef}` : '소속 날짜 확인불가'}</small>
                    <UncontrolledTooltip placement="top" target="delete">
                        Delete
                    </UncontrolledTooltip>
                    <i onClick={onDeleteClick} className="bi bi-trash ms-auto" id="delete" />
                </div>
            </div>
        </div>
    </NavItem>
);

UserListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    userColor: PropTypes.string.isRequired,
    userDatef: PropTypes.string.isRequired,
    active: PropTypes.any,
    onDeleteClick: PropTypes.func.isRequired,
};

export default UserListItem;
