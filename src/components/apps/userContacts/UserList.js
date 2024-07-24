import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'reactstrap';
import UserListItem from './UserListItem.js';
import { fetchUsers, SelectUser, DeleteUser } from 'src/store/apps/userContact/UserContactSlice.js';

const UserList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filterUsers = (users, userSearch) => {
        if (userSearch !== '')
            return users.filter(
                (t) =>
                    !t.deleted &&
                    t.title.toLocaleLowerCase().concat(' ').includes(userSearch.toLocaleLowerCase()),
            );
        return users.filter((t) => !t.deleted);
    };

    const users = useSelector((state) =>
        filterUsers(state.userContact.users, state.userContact.userSearch),
    );

    const active = useSelector((state) => state.userContact.userContent);

    return (
        <Nav>
            {users && users.length
                ? users.map((user) => (
                    <UserListItem
                        key={user.id}
                        {...user}
                        active={active}
                        onClick={() => dispatch(SelectUser(user.id))}
                        onDeleteClick={() => dispatch(DeleteUser(user.id))}
                        userTitle={user.title}
                        userColor={user.color}
                        userDatef={new Date(user.datef).toLocaleDateString({
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                        })}
                    />
                ))
                : 'no notes'}
        </Nav>
    );
};

export default UserList;
