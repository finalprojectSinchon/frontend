import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const fetchBaggageClaims = createAsyncThunk('baggageClaims/fetchBaggageClaims', async () => {
  const response = await api.get('/api/v1/airplane/baggage-claim');
  return response.data;
});

export const fetchBaggageClaim = createAsyncThunk('baggageClaims/fetchBaggageClaim', async ({ baggageClaimCode }) => {
  const response = await api.get(`/api/v1/airplane/baggage-claim/${baggageClaimCode}`);
  return response.data;
});

export const modifyBaggageClaim = createAsyncThunk('baggageClaims/modifyBaggageClaim', async ({ baggageClaimCode, baggageClaimInfo }) => {
  const response = await api.put(`/api/v1/airplane/baggage-claim/${baggageClaimCode}`, baggageClaimInfo);
  return response.data;
});

export const softdeleteBaggageClaim = createAsyncThunk('baggageClaims/softdeleteBaggageClaim', async ({baggageClaimCode}) => {
  const response = await api.put(`/api/v1/airplane/baggage-claim/${baggageClaimCode}/delete`);
  return response.data
});

export const registBaggageClaim = createAsyncThunk('chkinCounters/registChkinCounter',async (baggageClaimInfo, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/v1/airplane/baggage-claim`, baggageClaimInfo);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const baggageClaimSlice = createSlice({
  name: 'baggageClaims',
  initialState: {
    baggageClaimList: [],
    baggageClaimDetail: null, 
    modifybaggageClaim : null,
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBaggageClaims.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBaggageClaims.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.baggageClaimList = action.payload;
      })
      .addCase(fetchBaggageClaims.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchBaggageClaim.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBaggageClaim.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.baggageClaimDetail = action.payload; 
      })
      .addCase(fetchBaggageClaim.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(modifyBaggageClaim.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(modifyBaggageClaim.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.modifybaggageClaim = action.payload; 
      })
      .addCase(modifyBaggageClaim.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});



export default baggageClaimSlice.reducer;
