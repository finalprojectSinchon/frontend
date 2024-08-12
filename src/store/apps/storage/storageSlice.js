import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../airplane/api';
import StorageDetail from '../../../views/storage/StorageDetail';

export const createStorage = createAsyncThunk('storage/createStorage', async ({storageInfo}) => {
    console.log(storageInfo, "12112122121122112")
    const response = await api.post('/api/v1/storage', storageInfo);
    return response.data;
});

const storageSlice = createSlice({
    name: 'storages' ,
    initialState: {
        storageList: [],
        StorageDetails: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createStorage.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.storageList.push(action.payload);
        })
        .addCase(createStorage.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});

export default storageSlice.reducer;
