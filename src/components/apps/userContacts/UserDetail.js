import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, FormGroup, Button, Label } from 'reactstrap';
import { UpdateUser, addUser } from '../../../store/apps/userContact/UserContactSlice.js';

const colorsBg = [
    {
        bg: 'primary',
    },
    {
        bg: 'success',
    },
    {
        bg: 'danger',
    },
    {
        bg: 'info',
    },
    {
        bg: 'warning',
    },
];

const NoteDetail = () => {
    const userDetails = useSelector(
        (state) => state.userContact.users[state.userContact.userContent - 1],
    );
    const id = useSelector((state) => state.userContact.users.length + 1);

    const dispatch = useDispatch();

    const handleNote = (e) => {
        e.preventDefault();
        dispatch(addUser(id, 'dummy Title', 'primary'));
    };

    return (
        <div>
            <div className="border-bottom p-3 text-end">
                <Button className="btn btn-success ms-auto" size="sm" onClick={handleNote}>
                    Add New Note
                </Button>
            </div>
            {userDetails && userDetails.deleted === false ? (
                <div className="p-4">
                    <FormGroup>
                        <Label for="title1" tag="h5">
                            Edit Note
                        </Label>
                        <Input
                            id="title1"
                            name="title1"
                            type="textarea"
                            rows="5"
                            value={userDetails.title}
                            onChange={(e) => dispatch(UpdateUser(userDetails.id, 'title', e.target.value))}
                        />
                    </FormGroup>
                    <br />
                    <h5>Change Note color</h5>
                    <div className="button-group">
                        {colorsBg.map((colorbg) => (
                            <Button
                                color={colorbg.bg}
                                key={colorbg.bg}
                                size="sm"
                                onClick={() => dispatch(UpdateUser(userDetails.id, 'color', `${colorbg.bg}`))}
                            >
                                {userDetails.color === colorbg.bg ? (
                                    <i className="bi bi-check" />
                                ) : (
                                    <i className="bi bi-circle" />
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="d-flex mt-3 p-4 flex-column align-items-center justify-content-center">
                    <i className="ti-agenda display-5" />
                    <h4 className="mt-2">Please select a Note or Add Note.</h4>
                </div>
            )}
        </div>
    );
};

export default NoteDetail;
