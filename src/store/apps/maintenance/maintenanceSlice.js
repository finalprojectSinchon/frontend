import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../airplane/api';

export const fetchMaintenances = createAsyncThunk('maintenance/fetchMaintenances', async () => {
    const response = await api.get('/api/v1/maintenance');
    return response.data;
});

export const fetchMaintenance = createAsyncThunk('maintenance/fetchMaintenance', async ({ maintenanceCode }) => {
    const response = await api.get(`/api/v1/maintenance/${maintenanceCode}`);
    return response.data;
});

export const modifyMaintenance = createAsyncThunk('maintenance/modifyMaintenance', async ({ maintenanceCode, maintenanceInfo }) => {
    const response = await api.put(`/api/v1/maintenance/${maintenanceCode}`, maintenanceInfo);
    return response.data;
});

export const softdeleteMaintenance = createAsyncThunk('maintenance/softdeleteMaintenance', async ({ maintenanceCode }) => {
    const response = await api.put(`/api/v1/maintenance/${maintenanceCode}/delete`);
    return response.data;
});

export const createMaintenance = createAsyncThunk('maintenance/createMaintenance', async (maintenanceInfo) => {
    const response = await api.post('/api/v1/maintenance', maintenanceInfo);
    return response.data;
});

const maintenanceSlice = createSlice({
    name: 'maintenances',
    initialState: {
        maintenanceList: [],
        maintenanceDetails: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
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
            })
            .addCase(fetchMaintenance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.maintenanceDetails = action.payload;
            })
            .addCase(modifyMaintenance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.maintenanceList.findIndex(maintenance => maintenance.maintenanceCode === action.payload.maintenanceCode);
                if (index !== -1) {
                    state.maintenanceList[index] = action.payload;
                }
            })
            .addCase(softdeleteMaintenance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.maintenanceList.findIndex(maintenance => maintenance.maintenanceCode === action.payload.maintenanceCode);
                if (index !== -1) {
                    state.maintenanceList[index].isActive = 'N';
                }
            })
            .addCase(createMaintenance.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.maintenanceList.push(action.payload);
            })
            .addCase(createMaintenance.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default maintenanceSlice.reducer;
