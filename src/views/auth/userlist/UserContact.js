import { Card, CardBody } from 'reactstrap';
import UserDetail from '../../../components/apps/userContacts/UserDetail.js';
import UserList from '../../../components/apps/userContacts/UserList.js';
import UserSearch from '../../../components/apps/userContacts/UserSearch.js';
import TwoColumn from '../../../components/twoColumn/TwoColumn';
import './UserContact.scss'

const UserContact = () => {
    return (
        <>
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
        </>
    );
};

export default UserContact;
