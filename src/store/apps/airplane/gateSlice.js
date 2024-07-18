import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';



export const fetchGates = createAsyncThunk('airplane/fetchGates', async () => {
    const response = await api.get('/api/v1/airplane/gate');
    return response.data;
});


export const fetchGate = createAsyncThunk('airplane/fetchGate', async ({gateCode}) => {
    const response = await api.get(`/api/v1/airplane/gate/${gateCode}`);
    return response.data;
});




const gateSlice = createSlice({
    name: 'gates',
    initialState: {
        gateList: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGates.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchGates.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.gateList = action.payload;
            })
            .addCase(fetchGates.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default gateSlice.reducer;