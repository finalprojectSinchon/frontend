export const approveSlice = createSlice({
    name: 'approve',
    initialState: {
      approveData : null,
      status: 'idle',
      error: null,
    },
    reducers: {
  
    },
    extraReducers: (builder) => {
      builder
       
      .addCase(fetchApprove.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApprove.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.approveData = action.payload;  // 승인 데이터를 상태에 저장
      })
      .addCase(fetchApprove.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;  // 오류를 상태에 저장
      });
     
    },
  });

  export default approveSlice.reducer;