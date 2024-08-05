import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    facility: [], // 두번째 리스트
    facilityClick: "", // 필터 클릭
    createQR: "",
    selectpk: "", // 두번째 컬럼 클릭
    hoveredFacilityId: null, // 호버된 시설 ID
    rightContent : null,
};

const CreateQRSlice = createSlice({
    name: "createQR",
    initialState,
    reducers: {
        GetFacilityClick: (state, action) => {
            state.facilityClick = action.payload;
        },
        SetFacilityClick: (state, action) => {
            state.facilityClick = action.payload;
        },
        setFacility: (state, action) => {
            state.facility = action.payload;
        },
        setSelectpk: (state, action) => {
            state.selectpk = action.payload;
        },
        setHoveredFacilityId: (state, action) => {
            state.hoveredFacilityId = action.payload; // 호버된 시설 ID 설정
        },
        setRightContent: (state, action) => {
            state.rightContent = action.payload;
        }
    },
});

export const {
    GetFacilityClick,
    SetFacilityClick,
    setFacility,
    setSelectpk,
    setHoveredFacilityId,
    setRightContent,
} = CreateQRSlice.actions;

export default CreateQRSlice.reducer;
