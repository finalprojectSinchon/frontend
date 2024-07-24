import React from 'react';
import { Form, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {SearchUsers} from "src/store/apps/userContact/UserContactSlice.js";

const UserSearch = () => {
    const searchTerm = useSelector((state) => state.userContact.userSearch);

    const dispatch = useDispatch();

    return (
        <div className="p-3 border-bottom">
            <Form>
                <div className="position-relative has-icon-left">
                    <Input
                        className="form-control"
                        id="searchNote"
                        name="searchNote"
                        type="text"
                        onChange={e => dispatch(SearchUsers(e.target.value))}
                        value={searchTerm}
                        placeholder="검색하세요"
                    />
                </div>
            </Form>
        </div>
    );
};

export default UserSearch;
