import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../airplane/api';

export const fetchInspections = createAsyncThunk('inspection/fetchInspections', async () => {
    const response = await api.get('/api/v1/inspection');
    console.log("전체조회 전체 조회오냐 ?", response);
    return response.data;
});

export const fetchInspection = createAsyncThunk('inspection/fetchInspection', async ({ inspectionCode }) => {
    const response1 = await api.get(`/api/v1/inspection/${inspectionCode}`);
    console.log("상세조회 조회오냐 ?", response1);
    return response1.data;
});

export const modifyInspection = createAsyncThunk('inspection/modifyInspection', async ({ inspectionCode, inspectionInfo }) => {
    const response2 = await api.put(`/api/v1/inspection/${inspectionCode}/update`, inspectionInfo);
    console.log("수정 결과:", response2);
    return response2.data;
});

export const deleteInspection = createAsyncThunk('inspection/deleteInspection', async ({ inspectionCode }) => {
    const response3 = await api.put(`/api/v1/inspection/${inspectionCode}/delete`);
    console.log("삭제 결과:", response3);
    return response3.data;
});
export const registInspection = createAsyncThunk('inspection/inspectionRegist', async ({ inspectionInfo }) => {
    console.log('inspectionInfo111111', inspectionInfo);
    const response4 = await api.post(`/api/v1/inspectionRegist`, inspectionInfo);
    console.log("등록 결과:", response4);
    return response4.data;
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
            })
            .addCase(modifyInspection.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(modifyInspection.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.inspectionDetail = action.payload;
            })
            .addCase(modifyInspection.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteInspection.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteInspection.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.inspectionDetail = null; // 삭제 후 상세 정보는 null로 설정
                state.inspectionList = state.inspectionList.filter(
                    inspection => inspection.code !== action.meta.arg.inspectionCode
                );
            })
            .addCase(deleteInspection.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(registInspection.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registInspection.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.inspectionList.push(action.payload); // 새로 등록된 항목 추가
            })
            .addCase(registInspection.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default inspectionSlice.reducer;
