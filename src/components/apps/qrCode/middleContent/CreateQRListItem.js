import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavItem } from "reactstrap";

import "src/components/apps/approve/Style.css";
import {setSelectpk, setHoveredFacilityId, setRightContent} from "src/store/apps/createQR/CreateQRSlice.js";

const CreateQRListItem = ({ active, facility, onContactClick }) => {
    const dispatch = useDispatch();
    const hoveredFacilityId = useSelector((state) => state.createQR.hoveredFacilityId);
    const facilityClick = useSelector((state) => state.createQR.facilityClick);

    // 클릭 핸들러
    const handleItemClick = () => {
        dispatch(setSelectpk(facility.id));

        dispatch(setRightContent({
            facilityId: facility.id,
            facilityName: facilityClick,
        }))
    };

    return (
        <NavItem
            onClick={handleItemClick}
            onMouseEnter={() => dispatch(setHoveredFacilityId(facility.id))}
            onMouseLeave={() => dispatch(setHoveredFacilityId(null))}
            className={`w-100 cursor-pointer ${hoveredFacilityId === facility.id ? "bg-light" : ""} ${
                hoveredFacilityId === facility.id ? "hover" : ""
            }`}
            style={{ borderBottom: "1px solid #ccc" }}
        >
            <div className="d-flex align-items-center p-3 mb-1">
                <div className="storeName"></div>
                <div className="mx-2 flex-grow-1">
                    <h5 className="mb-0 text-truncate" style={{ width: "140px" }}>
                        {facility.name ? facility.name : facility.type}
                    </h5>
                    <small>{facility.location}</small>
                </div>
            </div>
        </NavItem>
    );
};

export default CreateQRListItem;
