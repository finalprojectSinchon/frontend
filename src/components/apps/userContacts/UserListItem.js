import React from 'react';
import { NavItem, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import StatusProfileImg from "src/components/apps/liveStatus/StatusProfileImg.js";

const UserListItem = ({ onClick, active, user, userColor, userDatef, onDeleteClick }) => (
    <NavItem className={`border-bottom cursor-pointer ${active === user.userCode ? 'bg-light' : ''}`}>
        <div onClick={onClick} className="d-flex align-items-center p-3">
            <StatusProfileImg userCode={user.userCode} src={user.userImg}/>
            <div className="flex-grow-1">
                <h5 className="text-truncate noteText mb-0 mt-1">{user.userName || '이름없음'}</h5>
                <h6 className="text-muted mt-2">{user.userDepartment ? user.userDepartment : '소속 없음'}</h6>
                <div className="d-flex align-items-center mt-2">
                    <small>{userDatef !== 'Invalid Date' ? `입사일 : ${userDatef}` : '입사일 확인불가'}</small>
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
