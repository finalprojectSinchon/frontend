import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../airplane/api';



export const fetchMaintenances = createAsyncThunk('maintenance/fetchMaintenances', async () => {
    const response = await api.get('/api/v1/maintenance');
    return response.data;
});


export const fetchMaintenance = createAsyncThunk('maintenance/fetchMaintenance', async ({maintenanceCode}) => {
    const response = await api.get(`/api/v1/maintenance/${maintenanceCode}`);
    return response.data;
});




const maintenanceSlice = createSlice({
    name: 'maintenances',
    initialState: {
        maintenanceList: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaintenances.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMaintenances.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.maintenanceList = action.payload;
            })
            .addCase(fetchMaintenances.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default maintenanceSlice.reducer;