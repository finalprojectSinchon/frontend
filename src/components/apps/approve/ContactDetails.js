import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { isEdit, fetchApprove } from '../../../store/apps/approve/ContactSlice';
import axios from 'axios';
import api from '../../../store/apps/airplane/api';

const ContactDetails = () => {
  const contactDetail = useSelector(state => state.contacts.selectedContact);
  const selectedFilter = useSelector(state => state.contacts.selectedFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApprove());
  }, [selectedFilter, dispatch]);

  if (!contactDetail) {
    return 'Please Select The contact';
  }

  console.log('contactDetail',contactDetail)

  const handleApproveClick = () => {
    api.put( `http://localhost:8080/api/v1/approve/${contactDetail.approvalCode}`) 
        .then(res =>{
          alert('승인 요청이 성공했습니다')
        }) 
        .catch (error=> {
        console.error('승인 요청 중 오류 발생', error);
    })
};


  const renderDetails = () => {
    if (selectedFilter === 'checkin_counter' || (selectedFilter === 'show_all' && contactDetail.checkinCounter)) {
      return (
        <>
          <tr>
            <td width="150"><h6>Approval Code</h6></td>
            <td>: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td><h6>Airplane Code</h6></td>
            <td>: {contactDetail.checkinCounter.airplane.airplaneCode}</td>
          </tr>
          <tr>
            <td><h6>Checkin Counter Code</h6></td>
            <td>: {contactDetail.checkinCounter.checkinCounterCode}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.checkinCounter.createdDate}</td>
          </tr>
          <tr>
            <td><h6>Last Inspection Date</h6></td>
            <td>: {contactDetail.checkinCounter.lastInspectionDate}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.checkinCounter.location}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.checkinCounter.manager}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.checkinCounter.modifiedDate}</td>
          </tr>
          <tr>
            <td><h6>Registration Date</h6></td>
            <td>: {contactDetail.checkinCounter.registrationDate}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.checkinCounter.status}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.checkinCounter.type}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.checkinCounter.note}</td>
          </tr>
        </>
      );
    } else if (selectedFilter === 'baggage_claim' || (selectedFilter === 'show_all' && contactDetail.baggageClaim)) {
      return (
        <>
          <tr>
            <td width="150"><h6>Approval Code</h6></td>
            <td>: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td><h6>Airplane Code</h6></td>
            <td>: {contactDetail.baggageClaim.airplane.airplaneCode}</td>
          </tr>
          <tr>
            <td><h6>Baggage Claim Code</h6></td>
            <td>: {contactDetail.baggageClaim.baggageClaimCode}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.baggageClaim.createdDate}</td>
          </tr>
          <tr>
            <td><h6>Last Inspection Date</h6></td>
            <td>: {contactDetail.baggageClaim.lastInspectionDate}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.baggageClaim.location}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.baggageClaim.manager}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.baggageClaim.modifiedDate}</td>
          </tr>
          <tr>
            <td><h6>Registration Date</h6></td>
            <td>: {contactDetail.baggageClaim.registrationDate}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.baggageClaim.status}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.baggageClaim.type}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.baggageClaim.note}</td>
          </tr>
        </>
      );
    } else if (selectedFilter === 'facilities' || (selectedFilter === 'show_all' && contactDetail.facilities)) {
      return (
        <>
          <tr>
            <td width="150"><h6>Approval Code</h6></td>
            <td>: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td><h6>Facility Code</h6></td>
            <td>: {contactDetail.facilities.facilitiesCode}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.facilities.createdDate}</td>
          </tr>
          <tr>
            <td><h6>Facility Class</h6></td>
            <td>: {contactDetail.facilities.facilitiesClass}</td>
          </tr>
          <tr>
            <td><h6>Facility Name</h6></td>
            <td>: {contactDetail.facilities.facilitiesName}</td>
          </tr>
          <tr>
            <td><h6>Facilities Type</h6></td>
            <td>: {contactDetail.facilities.facilitiesType}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.facilities.location}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.facilities.manager}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.facilities.modifiedDate}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.facilities.status}</td>
          </tr>
        </>
      );
    } else if (selectedFilter === 'gate' || (selectedFilter === 'show_all' && contactDetail.gate)) {
      return (
        <>
          <tr>
            <td width="150"><h6>Approval Code</h6></td>
            <td>: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td><h6>Airplane Code</h6></td>
            <td>: {contactDetail.gate.airplane.airplaneCode}</td>
          </tr>
          <tr>
            <td><h6>Gate Code</h6></td>
            <td>: {contactDetail.gate.gateCode}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.gate.createdDate}</td>
          </tr>
          <tr>
            <td><h6>Last Inspection Date</h6></td>
            <td>: {contactDetail.gate.lastInspectionDate}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.gate.location}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.gate.manager}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.gate.modifiedDate}</td>
          </tr>
          <tr>
            <td><h6>Registration Date</h6></td>
            <td>: {contactDetail.gate.registrationDate}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.gate.status}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.gate.type}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.gate.note}</td>
          </tr>
        </>
      );
    } else if (selectedFilter === 'storage' || (selectedFilter === 'show_all' && contactDetail.storage)) {
      return (
        <>
          <tr>
            <td width="150"><h6>Approval Code</h6></td>
            <td>: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td><h6>Storage Code</h6></td>
            <td>: {contactDetail.storage.storageCode}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.storage.createdDate}</td>
          </tr>
          <tr>
            <td><h6>Date</h6></td>
            <td>: {contactDetail.storage.date}</td>
          </tr>
          <tr>
            <td><h6>Department</h6></td>
            <td>: {contactDetail.storage.department}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.storage.location}</td>
          </tr>
          <tr>
            <td><h6>Manager </h6></td>
            <td>: {contactDetail.storage.manager}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.storage.modifiedDate}</td>
          </tr>
          <tr>
            <td><h6>Period</h6></td>
            <td>: {contactDetail.storage.period}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.storage.status}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.storage.type}</td>
          </tr>
        </>
      );
    } else if (selectedFilter === 'store' || (selectedFilter === 'show_all' && contactDetail.store)) {
      return (
        <>
          <tr>
            <td width="150"><h6>Approval Code</h6></td>
            <td>: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td><h6>Store Id</h6></td>
            <td>: {contactDetail.store.storeId}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.store.manager}</td>
          </tr>
          <tr>
            <td><h6>Status </h6></td>
            <td>: {contactDetail.store.status}</td>
          </tr>
          <tr>
            <td><h6>Store Contact</h6></td>
            <td>: {contactDetail.store.storeContact}</td>
          </tr>
          <tr>
            <td><h6>Store Extra</h6></td>
            <td>: {contactDetail.store.storeExtra}</td>
          </tr>
          <tr>
            <td><h6>Store Items</h6></td>
            <td>: {contactDetail.store.storeItems}</td>
          </tr>
          <tr>
            <td><h6>Store Name </h6></td>
            <td>: {contactDetail.store.storeName}</td>
          </tr>
          <tr>
            <td><h6> Store Work</h6></td>
            <td>: {contactDetail.store.storeWork}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.store.type}</td>
          </tr>
          <tr>
            <td><h6>OperatingTime</h6></td>
            <td>: {contactDetail.store.storeOperatingTime}</td>
          </tr>
          <tr>
            <td><h6>createdDate</h6></td>
            <td>: {contactDetail.store.createdDate}</td>
          </tr>
        </>
      );
    }
  };

  return (
    <>
        <div>
            <div className="d-flex align-items-center p-3 border-bottom">
                <div className="">
                    <img src={contactDetail.image} alt="user" className="rounded-circle" width="46" />
                </div>
                <div className="mx-2">
                    <h5 className="mb-0">
                        {contactDetail.firstname} {contactDetail.lastname}
                    </h5>
                    <small>{contactDetail.department}</small>
                </div>
            </div>

            <div className="p-4">
                <table className="table table-borderless">
                    <tbody>
                        {renderDetails()}
                        <tr>
                            <td />
                            <td>
                                <Button color="primary" onClick={handleApproveClick}>
                                    승인
                                </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
