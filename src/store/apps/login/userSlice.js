import { createSlice } from "@reduxjs/toolkit";

export let userToken = createSlice({
    name : userToken,
    initialState : {
        userToken : ''
    },
    reducers : {
        inputToken : (state, action) => {
            state.userToken = action.payload;
        }
    }
})

export const {inputToken} = userToken.actions;

export default userToken.reducer;