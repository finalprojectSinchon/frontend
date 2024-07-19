import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../airplane/api';

export const  fetchInspections = createAsyncThunk('inspection/fetchInspections', async () => {
    const response = await api.get('/api/v1/inspection');
    return response.data;
});

export const fetchInspection = createAsyncThunk('inspection/fetchInspection', async ({ inspectionCode }) => {
    const response = await api.get(`/api/v1/inspection/${inspectionCode}`);
    return response.data;
});
export const modifyInspection = createAsyncThunk('inspection/modifyinspection', async ({ inspectionCode, inspectionInfo }) => {
    const response = await api.put(`/api/v1/inspection/${inspectionCode}`, inspectionInfo);
    return response.data;
});

const inspectionSlice = createSlice({
    name: 'inspections',
    initialState: {
        inspectionList: [],
        inspectionDetail: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInspections.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInspections.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.inspectionList = action.payload;
            })
            .addCase(fetchInspections.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchInspection.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInspection.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.inspectionDetail = action.payload;
            })
            .addCase(fetchInspection.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default inspectionSlice.reducer;
