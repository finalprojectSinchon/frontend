import React from 'react';
import { Card, CardBody } from 'reactstrap';
import UserDetail from '../../../components/apps/userContacts/UserDetail';
import UserList from '../../../components/apps/userContacts/UserList';
import UserSearch from '../../../components/apps/userContacts/UserSearch';
import TwoColumn from '../../../components/twoColumn/TwoColumn';
import './UserContact.scss';

const UserContact = () => {
    return (
        <Card>
            <CardBody>
                <TwoColumn
                    leftContent={
                        <>
                            <UserSearch />
                            <UserList />
                        </>
                    }
                    rightContent={<UserDetail />}
                />
            </CardBody>
        </Card>
    );
};

export default UserContact;
