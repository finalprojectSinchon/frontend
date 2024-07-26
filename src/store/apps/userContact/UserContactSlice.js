import { createSlice } from '@reduxjs/toolkit';
import api from '../../../store/apps/airplane/api';

const initialState = {
    users: [],
    userContentCode: 1,
    userSearch: '',
};

const UserContactSlice = createSlice({
    name: 'userContact',
    initialState,
    reducers: {
        getUsers: (state, action) => {
            state.users = action.payload;
        },
        SearchUsers: (state, action) => {
            state.userSearch = action.payload;
        },
        SelectUser: (state, action) => {
            state.userContentCode = action.payload;
        },
        DeleteUser: (state, action) => {
            const index = state.users.findIndex((note) => note.id === action.payload);
            state.users.splice(index, 1);
        },
        UpdateUser: {
            reducer: (state, action) => {
                state.users = state.users.map((user) =>
                    user.id === action.payload.id
                        ? { ...user, [action.payload.field]: action.payload.value }
                        : user
                );
            },
            prepare: ({ id, field, value }) => {
                return { payload: { id, field, value } };
            },
        },
        addUser: {
            reducer: (state, action) => {
                state.users.push(action.payload);
            },
            prepare: (id, title, color) => {
                return { payload: { id, title, color, createdDate: new Date().toISOString(), deleted: false } };
            },
        },
    },
});

export const { getUsers, SearchUsers, SelectUser, DeleteUser, UpdateUser, addUser } = UserContactSlice.actions;

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await api.get('/api/v1/admin/contact');
        dispatch(getUsers(response.data.data));
    } catch (err) {
        throw new Error(err);
    }
};

export default UserContactSlice.reducer;
