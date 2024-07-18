import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';



export const fetchInspections = createAsyncThunk('inspection/fetchinspections', async () => {
    const response = await api.get('/api/v1/inspection');
    return response.data;
});


export const fetchInspection = createAsyncThunk('inspection/fetchinspections', async ({inspectionCode}) => {
    const response = await api.get(`/api/v1/inspection`);
    return response.data;
});




const inspectionSlice = createSlice({
    name: 'inspections',
    initialState: {
        inspectionList: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInspections.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInspections.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.gateList = action.payload;
            })
            .addCase(fetchInspections.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default inspectionSlice.reducer;