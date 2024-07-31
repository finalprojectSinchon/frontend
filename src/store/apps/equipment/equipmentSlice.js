import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../airplane/api';

export const fetchEquipments = createAsyncThunk('equipment/fetchEquipments', async () => {
    const response = await api.get('/api/v1/equipment');
    console.log("전체조회 응답 데이터:", response.data);
    return response.data;
});

export const fetchEquipment = createAsyncThunk('equipment/fetchEquipment', async ({ equipmentCode }) => {
    const response = await api.get(`/api/v1/equipment/${equipmentCode}`);
    console.log("상세조회 응답 데이터:", response.data);
    return response.data;
});

export const modifyEquipment = createAsyncThunk('equipment/modifyEquipment', async ({ equipmentCode, equipmentInfo }) => {
    console.log('equipmentInfo',equipmentInfo)
    const response = await api.put(`/api/v1/equipment/${equipmentCode}/update`, equipmentInfo);
    console.log("수정 결과:", response.data);
    return response.data;
});

export const deleteEquipment = createAsyncThunk('equipment/deleteEquipment', async ({ equipmentCode }) => {
    const response = await api.put(`/api/v1/equipment/${equipmentCode}/delete`);
    console.log("삭제 결과:", response.data);
    return response.data;
});

export const registEquipment = createAsyncThunk('equipment/equipmentRegist', async ({ equipmentInfo }) => {
    console.log('equipmentInfoasd',equipmentInfo)
    const response4 = await api.post(`/api/v1/equipmentRegist`,equipmentInfo);
    console.log("등록 결과:", response4);
    return response4.data;
});

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState: {
        equipmentList: [],
        equipmentDetail: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEquipments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEquipments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.equipmentList = action.payload;
            })
            .addCase(fetchEquipments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchEquipment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEquipment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.equipmentDetail = action.payload;
            })
            .addCase(fetchEquipment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(modifyEquipment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(modifyEquipment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.equipmentDetail = action.payload;
            })
            .addCase(modifyEquipment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteEquipment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEquipment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.equipmentDetail = null;
                state.equipmentList = state.equipmentList.filter(
                    equipment => equipment.Code !== action.meta.arg.equipmentCode
                );
            })
            .addCase(deleteEquipment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                
            })
            .addCase(registEquipment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(registEquipment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.equipmentList = action.payload;
            })
            .addCase(registEquipment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default equipmentSlice.reducer;
