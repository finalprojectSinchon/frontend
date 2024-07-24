import React from 'react';
import { NavItem, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';

const UserListItem = ({ onClick, id, active, userTitle, userColor, userDatef, onDeleteClick }) => (
    <NavItem className={`border-bottom cursor-pointer ${active === id ? 'bg-light' : ''}`}>
        <div onClick={onClick} className={`border-start p-3 border-4 border-${userColor}`}>
            <h5 className="text-truncate noteText">{userTitle}</h5>
            <div className="d-flex">
                <small>{userDatef}</small>
                <UncontrolledTooltip placement="top" target="delete">
                    Delete
                </UncontrolledTooltip>
                <i onClick={onDeleteClick} className="bi bi-trash ms-auto" id="delete" />
            </div>
        </div>
    </NavItem>
);

UserListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    noteTitle: PropTypes.string.isRequired,
    noteDatef: PropTypes.string.isRequired,
    noteColor: PropTypes.string.isRequired,
    id: PropTypes.number,
    active: PropTypes.any,
    onDeleteClick: PropTypes.func.isRequired,
};

export default UserListItem;
