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
        } else if (facilities.gate) {
            setNewFacility(facilities.gate);
        } else if (facilities.checkInCounter) {
            setNewFacility(facilities.checkInCounter);
        } else if (facilities.showAll) {
            setNewFacility(facilities.showAll);
        } else if (facilities.storage) {
            setNewFacility(facilities.storage);
        } else if (facilities.facilities) {
            setNewFacility(facilities.facilities);
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
