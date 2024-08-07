import React from 'react';
import { Form, Input, Button } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {searchFacility} from "src/store/apps/createQR/CreateQRSlice.js";


const ContactSearch = () => {


  const dispatch = useDispatch();

  return (
    <div className="p-3 border-bottom d-flex">
      <span className='d-xs-block d-xl-none '><Button close className="me-2" /></span> 
      <Form className="flex-grow-1">
        <Input
          className="form-control mb-2"
          id="searchUSer"
          name="searchUser"
          type="text"
          onChange={(e) => dispatch(searchFacility(e.target.value))}
          placeholder="Search Contact..."
        />
      </Form>
    </div>
  );
};

export default ContactSearch;
