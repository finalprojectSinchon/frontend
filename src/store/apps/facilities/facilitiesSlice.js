import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from  '../airplane/api';

export const createFacilities = createAsyncThunk('facilities/createFacilities', async ({facilitiesInfo}) => {

    const response = await api.post('/api/v1/facilities', facilitiesInfo);
    return response.data;
});

const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState: {
        facilitiesList: [],
        facilitiesDetails: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createFacilities.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.facilitiesList.push(action.payload);
            })
            .addCase(createFacilities.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default facilitiesSlice.reducer;

