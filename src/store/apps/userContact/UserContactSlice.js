import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    users: [],
    userContent: 1,
    userSearch: '',
}

export const UserContactSlice = createSlice({
    name : 'userContact',
    initialState,
    reducers : {
        getUsers: (state, action) => {
            state.users = action.payload;
        },
        SearchUsers: (state, action) => {
            state.userSearch = action.payload;
        },
        SelectUser: (state, action) => {
            state.userContent = action.payload;
        },
        DeleteUser(state, action) {
            const index = state.notes.findIndex((note) => note.id === action.payload);
            state.notes.splice(index, 1);
        },
        UpdateUser: {
            reducer: (state, action) => {
                state.users = state.users.map((user) =>
                    user.id === action.payload.id
                        ? { ...user, [action.payload.field]: action.payload.value }
                        : user,
                );
            },
            prepare: (id, field, value) => {
                return {
                    payload: { id, field, value },
                };
            },
        },

        addUser: {
            reducer: (state, action) => {
                state.users.push(action.payload);
            },
            prepare: (id, title, color) => {
                return { payload: { id, title, color, datef: new Date().toDateString(), deleted: false } };
            },
        },
    },


})



export const { getUsers, SearchUsers, SelectUser, DeleteUser, UpdateUser, addUser } = UserContactSlice.actions;

export const fetchUsers = () => async (dispatch) => {
    try {
        const response = await axios.get('/data/SampleData.json');
        dispatch(getUsers(response.data));
    } catch (err) {
        throw new Error(err);
    }
};

export default UserContactSlice.reducer;