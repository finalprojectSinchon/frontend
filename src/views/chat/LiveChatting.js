import React from 'react';
import { Card, CardBody } from 'reactstrap';
import UserList from '../../components/apps/userContacts/UserList.js';
import UserSearch from '../../components/apps/userContacts/UserSearch.js';
import TwoColumn from '../../components/twoColumn/TwoColumn.js';
import '../auth/userlist/UserContact.scss';
import TestChatting from "src/views/chat/TestChatting.js";

const LiveChatting = () => {
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
                    rightContent={<TestChatting />}
                />
            </CardBody>
        </Card>
    );
};

export default LiveChatting;
