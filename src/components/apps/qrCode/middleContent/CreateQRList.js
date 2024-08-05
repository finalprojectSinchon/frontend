import React, { useEffect, useState } from 'react';
import {Nav, Spinner} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import CreateQRListItem from "src/components/apps/qrCode/middleContent/CreateQRListItem.js";
import {setSelectpk} from "src/store/apps/createQR/CreateQRSlice.js";

const ContactList = () => {
    const dispatch = useDispatch();

    const facilities = useSelector(state => state.createQR.facility);
    const [newFacility, setNewFacility] = useState([])

    useEffect(() => {

        if(facilities.store) {
            setNewFacility(facilities.store);
        } else if (facilities.baggageClaim) {
            setNewFacility(facilities.baggageClaim);
        }


    }, [facilities]);


    const active = useSelector((state) => state.createQR.facilityClick);

    return (
        <Nav>
            {newFacility ? newFacility.map((facility) => (
                <CreateQRListItem
                    key={facility.id}
                    active={active}
                    facility={facility}
                    onContactClick={() => {dispatch(setSelectpk(facility.id))}}
                    // onDeleteClick={}
                    // onStarredClick={}
                />
            )) : <Spinner/>}
        </Nav>
    );
};

export default ContactList;
