import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import axios from 'axios';  // axios 추가
import { fetchApprove } from '../../../store/apps/approve/ContactSlice';
import api from '../../../store/apps/airplane/api';

const ContactDetails = () => {
  const contactDetail = useSelector(state => state.contacts.selectedContact);
  const selectedFilter = useSelector(state => state.contacts.selectedFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApprove());
  }, [selectedFilter, dispatch]);  // 의존성 배열에 dispatch 추가

  if (!contactDetail) {
    return 'Please Select The contact';
  }
  console.log('contactDetail', contactDetail)
  const handleApproveClick = () => {
    if (!contactDetail.approvalCode) {
      alert('승인 코드가 없습니다.');
      return;
    }

    // 승인 여부를 확인하는 로직 추가
    if (contactDetail.status === 'Y') {
      alert('이미 승인된 시설물입니다.');
      return;
    }
    api.put(`/api/v1/approve/${contactDetail.approvalCode}`)
      .then(res => {
        alert('승인 요청이 성공했습니다');
        window.location.reload();
      })
      
      .catch(error => {
        console.error('승인 요청 중 오류 발생', error);
        alert('승인 요청 중 오류 발생');
      });
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
            <td>: {contactDetail.checkinCounter.airplane?.airplaneCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Checkin Counter Code</h6></td>
            <td>: {contactDetail.checkinCounter.checkinCounterCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.checkinCounter.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Last Inspection Date</h6></td>
            <td>: {contactDetail.checkinCounter.lastInspectionDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.checkinCounter.location || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.checkinCounter.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.checkinCounter.modifiedDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Registration Date</h6></td>
            <td>: {contactDetail.checkinCounter.registrationDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.checkinCounter.status || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.checkinCounter.type || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.checkinCounter.note || 'N/A'}</td>
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
            <td>: {contactDetail.baggageClaim.airplane?.airplaneCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Baggage Claim Code</h6></td>
            <td>: {contactDetail.baggageClaim.baggageClaimCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.baggageClaim.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Last Inspection Date</h6></td>
            <td>: {contactDetail.baggageClaim.lastInspectionDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.baggageClaim.location || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.baggageClaim.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.baggageClaim.modifiedDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Registration Date</h6></td>
            <td>: {contactDetail.baggageClaim.registrationDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.baggageClaim.status || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.baggageClaim.type || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.baggageClaim.note || 'N/A'}</td>
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
            <td>: {contactDetail.facilities.facilitiesCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.facilities.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Facility Class</h6></td>
            <td>: {contactDetail.facilities.facilitiesClass || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Facility Name</h6></td>
            <td>: {contactDetail.facilities.facilitiesName || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Facilities Type</h6></td>
            <td>: {contactDetail.facilities.facilitiesType || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.facilities.location || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.facilities.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.facilities.modifiedDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.facilities.status || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.facilities.note || 'N/A'}</td>
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
            <td>: {contactDetail.gate.airplane?.airplaneCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Gate Code</h6></td>
            <td>: {contactDetail.gate.gateCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.gate.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Last Inspection Date</h6></td>
            <td>: {contactDetail.gate.lastInspectionDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.gate.location || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.gate.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.gate.modifiedDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Registration Date</h6></td>
            <td>: {contactDetail.gate.registrationDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.gate.status || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.gate.type || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.gate.note || 'N/A'}</td>
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
            <td>: {contactDetail.storage.storageCode || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.storage.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Date</h6></td>
            <td>: {contactDetail.storage.date || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Department</h6></td>
            <td>: {contactDetail.storage.department || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Location</h6></td>
            <td>: {contactDetail.storage.location || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.storage.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Modified Date</h6></td>
            <td>: {contactDetail.storage.modifiedDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Period</h6></td>
            <td>: {contactDetail.storage.period || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.storage.status || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.storage.type || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.storage.note || 'N/A'}</td>
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
            <td>: {contactDetail.store.storeId || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Manager</h6></td>
            <td>: {contactDetail.store.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Status</h6></td>
            <td>: {contactDetail.store.status || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Store Contact</h6></td>
            <td>: {contactDetail.store.storeContact || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Store Extra</h6></td>
            <td>: {contactDetail.store.storeExtra || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Store Items</h6></td>
            <td>: {contactDetail.store.storeItems || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Store Name</h6></td>
            <td>: {contactDetail.store.storeName || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Store Work</h6></td>
            <td>: {contactDetail.store.storeWork || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Type</h6></td>
            <td>: {contactDetail.store.type || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Operating Time</h6></td>
            <td>: {contactDetail.store.storeOperatingTime || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Created Date</h6></td>
            <td>: {contactDetail.store.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>Note</h6></td>
            <td>: {contactDetail.store.note || 'N/A'}</td>
          </tr>
        </>
      );
    }
    return null;
  };

  const getManagerName = () => {
    switch (selectedFilter) {
      case 'checkin_counter':
        return contactDetail.checkinCounter?.manager || 'N/A';
      case 'baggage_claim':
        return contactDetail.baggageClaim?.manager || 'N/A';
      case 'facilities':
        return contactDetail.facilities?.manager || 'N/A';
      case 'gate':
        return contactDetail.gate?.manager || 'N/A';
      case 'storage':
        return contactDetail.storage?.manager || 'N/A';
      case 'store':
        return contactDetail.store?.manager || 'N/A';
      case 'show_all':
        return (
          <>
            {contactDetail.checkinCounter && (
              <div>
                <h5> {contactDetail.checkinCounter.manager || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.baggageClaim && (
              <div>
                <h5>{contactDetail.baggageClaim.manager || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.facilities && (
              <div>
                <h5>{contactDetail.facilities.manager || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.gate && (
              <div>
                <h5>{contactDetail.gate.manager || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.storage && (
              <div>
                <h5> {contactDetail.storage.manager || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.store && (
              <div>
                <h5>{contactDetail.store.manager || 'N/A'}</h5>
              </div>
            )}
          </>
        );
      default:
        return 'Select a valid filter';
    }
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center p-3 border-bottom">
          <div className="me-3">
            <img src={contactDetail.image} alt="user" className="rounded-circle" width="46" />
          </div>
          <div>
            <h5 className="mb-0">
              {contactDetail.firstname} {contactDetail.lastname}
            </h5>
            <small>{contactDetail.department}</small>
            <div className="mt-2">
              <p>{getManagerName()}</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <table>
            <tbody>
              {renderDetails()}
            </tbody>
          </table>
        </div>
        <div className="p-4">
          <Button color="primary" onClick={handleApproveClick}>
            승인
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContactDetails;
