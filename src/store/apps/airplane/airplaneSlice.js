import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const fetchAirplanes = createAsyncThunk('airplanes/fetchAirplanes', async () => {
  const response = await api.get('/api/v1/airplane');
  return response.data;
});

export const fetchAirplane = createAsyncThunk('airplanes/fetchAirplane', async ({ airplaneCode }) => {
  const response = await api.get(`/api/v1/airplane/${airplaneCode}`);
  return response.data;
});

export const modifyAirplane = createAsyncThunk('airplanes/modifyAirplane', async ({ airplaneCode, airplaneInfo }) => {
  const response = await api.put(`/api/v1/airplane/${airplaneCode}`, airplaneInfo);
  return response.data;
});

export const softdeleteAirplane = createAsyncThunk('airplanes/softdeleteAirplane', async ({airplaneCode}) => {
  const response = await api.put(`/api/v1/airplane/${airplaneCode}/delete`);
  return response.data
})

const airplaneSlice = createSlice({
  name: 'airplanes',
  initialState: {
    airplaneList: [],
    airplaneDetail: null, 
    modifyAirplane : null,
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAirplanes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAirplanes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.airplaneList = action.payload;
      })
      .addCase(fetchAirplanes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAirplane.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAirplane.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.airplaneDetail = action.payload; 
      })
      .addCase(fetchAirplane.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(modifyAirplane.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(modifyAirplane.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.modifyAirplane = action.payload; 
      })
      .addCase(modifyAirplane.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});



export default airplaneSlice.reducer;
