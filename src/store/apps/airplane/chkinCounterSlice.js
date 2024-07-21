import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const fetchChkinCounters = createAsyncThunk('chkinCounters/fetchChkinCounters', async () => {
  const response = await api.get('/api/v1/airplane/checkin-counter');
  return response.data;
});

export const fetchChkinCounter = createAsyncThunk('chkinCounters/fetchChkinCounter', async ({ checkinCounterCode }) => {
  const response = await api.get(`/api/v1/airplane/checkin-counter/${checkinCounterCode}`);
  return response.data;
});

export const modifyChkinCounter = createAsyncThunk('chkinCounters/modifyChkinCounter', async ({ checkinCounterCode, checkinCounterInfo }) => {
  const response = await api.put(`/api/v1/airplane/checkin-counter/${checkinCounterCode}`, checkinCounterInfo);
  return response.data;
});

export const softdeleteChkinCounter = createAsyncThunk('chkinCounters/softdeleteChkinCounter', async ({checkinCounterCode}) => {
  const response = await api.put(`/api/v1/airplane/checkin-counter/${checkinCounterCode}/delete`);
  return response.data
})

const chkinCounterSlice = createSlice({
  name: 'chkinCounters',
  initialState: {
    chkinCounterList: [],
    chkinCounterDetail: null, 
    modifyChkinCounter : null,
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChkinCounters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChkinCounters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chkinCounterList = action.payload;
      })
      .addCase(fetchChkinCounters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchChkinCounter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChkinCounter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chkinCounterDetail = action.payload; 
      })
      .addCase(fetchChkinCounter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(modifyChkinCounter.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(modifyChkinCounter.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.modifyGate = action.payload; 
      })
      .addCase(modifyChkinCounter.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});



export default chkinCounterSlice.reducer;
