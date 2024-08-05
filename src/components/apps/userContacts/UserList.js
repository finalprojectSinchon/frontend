import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'reactstrap';
import UserListItem from './UserListItem';
import { fetchUsers, SelectUser, DeleteUser } from '../../../store/apps/userContact/UserContactSlice';
import UserStatus from "src/components/apps/liveStatus/UserStatus.js";

const UserList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    // 여기서 필터 거름
    const filterUsers = (users, userSearch) => {
        if (userSearch !== '')
            return users.filter(
                (t) =>
                    !t.deleted &&
                    t.userName.toLowerCase().concat(' ').includes(userSearch.toLowerCase())
            );
        return users.filter((t) => !t.deleted);
    };

    const users = useSelector((state) =>
        filterUsers(state.userContact.users, state.userContact.userSearch)
    );

    const active = useSelector((state) => state.userContact.userContentCode);

    return (
        <Nav>
            {users && users.length
                ? users.map((user) => (
                    <>
                    <UserListItem
                        key={user.userCode}
                        {...user}
                        active={active}
                        onClick={() => {
                            dispatch(SelectUser(user.userCode))
                        }}
                        onDeleteClick={() => dispatch(DeleteUser(user.userCode))}
                        user={user}
                        userDatef={new Date(user.createdDate).toLocaleDateString({
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                        })}
                    />
                    </>
                ))
                : 'no notes'}
        </Nav>
    );
};

export default UserList;
