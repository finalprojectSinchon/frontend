import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

export const fetchGates = createAsyncThunk('gates/fetchGates', async () => {
  const response = await api.get('/api/v1/airplane/gate');
  return response.data;
});

export const fetchGates1 = createAsyncThunk('gates/fetchGates', async () => {
  const response = await api.get('/api/v1/airplane/gate1');
  return response.data;
});

export const fetchGates2 = createAsyncThunk('gates/fetchGates', async () => {
  const response = await api.get('/api/v1/airplane/gate2');
  return response.data;
});


export const fetchGates3 = createAsyncThunk('gates/fetchGates', async () => {
  const response = await api.get('/api/v1/airplane/gate3');
  return response.data;
});


export const fetchGates4 = createAsyncThunk('gates/fetchGates', async () => {
  const response = await api.get('/api/v1/airplane/gate4');
  return response.data;
});




export const fetchGate = createAsyncThunk('gates/fetchGate', async ({ gateCode }) => {
  const response = await api.get(`/api/v1/airplane/gate/${gateCode}`);
  return response.data;
});

export const modifyGate = createAsyncThunk('gates/modifyGate', async ({ gateCode, gateInfo }) => {
  const response = await api.put(`/api/v1/airplane/gate/${gateCode}`, gateInfo);
  return response.data;
});

export const softdeleteGate = createAsyncThunk('gates/softDelete', async ({gateCode}) => {
  const response = await api.put(`/api/v1/airplane/gate/${gateCode}/delete`);
  return response.data
})

export const registGate = createAsyncThunk('gates/registGate',async (gateInfo, { rejectWithValue }) => {
  try {
    const response = await api.post(`/api/v1/airplane/gate`, gateInfo);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return rejectWithValue(error.response.data);
  }
}
);

const gateSlice = createSlice({
  name: 'gates',
  initialState: {
    gateList: [],
    gateDetail: null, 
    modifyGate : null,
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
      })
      .addCase(fetchGate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.gateDetail = action.payload; 
      })
      .addCase(fetchGate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(modifyGate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(modifyGate.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.modifyGate = action.payload; 
      })
      .addCase(modifyGate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  },
});



export default gateSlice.reducer;
