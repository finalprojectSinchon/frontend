import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../airplane/api';
import {ContactSlice, getContacts} from "src/store/apps/approve/ContactSlice.js";

export const fetchEquipments = createAsyncThunk('equipment/fetchEquipments', async () => {
    const response = await api.get('/api/v1/equipment');
    return response.data;
});

export const fetchEquipment = createAsyncThunk('equipment/fetchEquipment', async ({ equipmentCode }) => {
    const response = await api.get(`/api/v1/equipment/${equipmentCode}`);
    return response.data;
});

export const modifyEquipment = createAsyncThunk('equipment/modifyEquipment', async ({ equipmentCode, equipmentInfo }) => {
    const response = await api.put(`/api/v1/equipment/${equipmentCode}`, equipmentInfo);
    return response.data;
});

export const deleteEquipment = createAsyncThunk('equipment/deleteEquipment', async ({ equipmentCode }) => {
    const response = await api.put(`/api/v1/equipment/${equipmentCode}/delete`);

    return response.data;
});

export const registEquipment = createAsyncThunk('equipment/equipmentRegist', async ({ equipmentInfo }) => {
    const response4 = await api.post(`/api/v1/equipment`,equipmentInfo);
    return response4.data;
});

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState: {
        equipmentList: [],
        equipmentDetail: null,
        status: 'idle',
        error: null,
        currentFilter : "show_all",
        epuipments : [],
        sort : ""
    },
    reducers: {
        getEquipments: (state, action) => {
            state.epuipments = action.payload;
        },
        setVisibilityFilter: (state, action) => {
            state.currentFilter = action.payload;
        },
        setSortFilter : (state,action) => {
            state.sort = action.payload
        }
    },
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
export const fetchEquip = () => async (dispatch, getState) => {
    try {
        const state = getState();
        const response = await api.get('/api/v1/equipment');
        const equipments = response.data;

        const filteredEquipments = equipments.filter(equip => {
            if (state.equipments.currentFilter === 'show_all') {
                return true;
            } else if (equip.category=="항공기정비장비") {
                return equip.category === state.equipments.currentFilter;
            } else if (equip.category =="활주로및계류장유지보수장비") {
                return contact.category === state.equipments.currentFilter;
            } else if (contact.category == "전기및전자장비") {
                return contact.category === state.equipments.currentFilter;
            } else if (contact.category == "통신및네트워크장비") {
                return contact.category === state.equipments.currentFilter;
            } else if (contact.category == "화재및안정장비") {
                return contact.category === state.equipments.currentFilter;
            } else if (contact.category == "청소및환경관리장비") {
                return contact.category === state.equipments.currentFilter;
            } else if (contact.category == "건설및건축장비") {
                return contact.category === state.equipments.currentFilter;
            } else if (contact.category == "운송및물류장비") {
                return contact.category === state.equipments.currentFilter;
            }
        });

        dispatch(getEquipments(filteredEquipments));
    } catch (err) {
        console.error('Failed to fetch contacts:', err);
    }
};


export const {
    setVisibilityFilter,
    setSortFilter
} = equipmentSlice.actions;

export default equipmentSlice.reducer;
