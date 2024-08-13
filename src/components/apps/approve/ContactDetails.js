import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'reactstrap';
import axios from 'axios';  // axios 추가
import { fetchApprove } from '../../../store/apps/approve/ContactSlice';
import api from '../../../store/apps/airplane/api';
import CustomModal  from "src/views/CustomModal.js";
import { Table } from 'reactstrap';

//표형식으로 고쳐버리기 
const ContactDetails = () => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [type,setType] = useState('');
    const [content, setContent] = useState('');

  const contactDetail = useSelector(state => state.contacts.selectedContact);
  const selectedFilter = useSelector(state => state.contacts.selectedFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApprove());
  }, [selectedFilter, dispatch]);  // 의존성 배열에 dispatch 추가

  if (!contactDetail) {
    return 'Please Select The contact';
  }

  const handleApproveClick = () => {
    if (!contactDetail.approvalCode) {
        setType('승인');
        setContent('승인 코드가 없습니다.');
        toggleModal();
      return;
    }

    // 승인 여부를 확인하는 로직 추가
    if (contactDetail.status === 'Y') {
        setType('승인');
        setContent('이미 승인된 시설물입니다.');
        toggleModal();
      return;
    }
    api.put(`/api/v1/approve/${contactDetail.approvalCode}`)
      .then(res => {
          setType('승인');
          setContent('승인 요청이 성공했습니다');
          toggleModal();
          setTimeout(() => {
        window.location.reload();
          }, 3000);
      })
      
      .catch(error => {
        console.error('승인 요청 중 오류 발생', error);
          setType('승인');
          setContent('승인 요청 중 오류 발생');
          toggleModal();
      });
  };

  const renderDetails = () => {
    if (selectedFilter === 'checkin_counter' || (selectedFilter === 'show_all' && contactDetail.checkinCounter)) {
      return (
        <Table bordered>
          <tbody>
            <tr>
            <td width="250" style={{ textAlign: 'center' }}><h6>승인 코드</h6></td>
              <td width="400"> {contactDetail.approvalCode}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>비행기 코드</h6></td>
              <td> {contactDetail.checkinCounter.airplane?.airplaneCode || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>체크인 카운터 코드</h6></td>
              <td> {contactDetail.checkinCounter.checkinCounterCode || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>담당자</h6></td>
              <td> {contactDetail.checkinCounter.manager || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>상태</h6></td>
              <td> {contactDetail.checkinCounter.status || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>타입</h6></td>
              <td> {contactDetail.checkinCounter.type || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>항공사</h6></td>
              <td> {contactDetail.checkinCounter.airplane?.airline || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>편명</h6></td>
              <td>{contactDetail.checkinCounter.airplane?.flightId || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>도착 공항명</h6></td>
              <td>{contactDetail.checkinCounter.airplane?.airport || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>운항 상태</h6></td>
              <td> {contactDetail.checkinCounter.airplane?.remark || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>위치</h6></td>
              <td> {contactDetail.checkinCounter.location || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>지연시간</h6></td>
              <td> {contactDetail.checkinCounter.airplane?.delayTime || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>등록 일자</h6></td>
              <td> {contactDetail.checkinCounter.registrationDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>수정 일자</h6></td>
              <td>{contactDetail.checkinCounter.modifiedDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>최근 점검 일자</h6></td>
              <td> {contactDetail.checkinCounter.lastInspectionDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>승인 요청 일자</h6></td>
              <td> {contactDetail.checkinCounter.createdDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style={{ textAlign: 'center' }}><h6>비고</h6></td>
              <td> {contactDetail.checkinCounter.note || 'N/A'}</td>
            </tr>
          </tbody>
        </Table>

      )} else if (selectedFilter === 'baggage_claim' || (selectedFilter === 'show_all' && contactDetail.baggageClaim)) {
      return (
        <Table bordered>
          <tbody>
          <tr>
            <td width="250" style={{ textAlign: 'center' }}><h6>승인 코드</h6></td>
            <td width="400"> {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>비행기 코드</h6></td>
            <td>: {contactDetail.baggageClaim.airplane?.airplaneCode || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>수하물 수취대 코드</h6></td>
            <td>: {contactDetail.baggageClaim.baggageClaimCode || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>담당자</h6></td>
            <td>: {contactDetail.baggageClaim.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>상태</h6></td>
            <td>: {contactDetail.baggageClaim.status || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>타입</h6></td>
            <td>: {contactDetail.baggageClaim.type || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>위치</h6></td>
            <td>: {contactDetail.baggageClaim.location || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>항공사</h6></td>
            <td>: {contactDetail.baggageClaim.airplane?.airline || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>편명</h6></td>
            <td>: {contactDetail.baggageClaim.airplane?.flightId || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>도착공항명</h6></td>
            <td>: {contactDetail.baggageClaim.airplane?.airport || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>지연 시간</h6></td>
            <td>: {contactDetail.baggageClaim.airplane?.delayTime || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>등록 일자</h6></td>
            <td>: {contactDetail.baggageClaim.registrationDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>수정 일자</h6></td>
            <td>: {contactDetail.baggageClaim.modifiedDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>최근 점검일</h6></td>
            <td>: {contactDetail.baggageClaim.lastInspectionDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>승인 요청 일자</h6></td>
            <td>: {contactDetail.baggageClaim.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>비고</h6></td>
            <td>: {contactDetail.baggageClaim.note || 'N/A'}</td>
          </tr>
          </tbody>
          </Table>
      );
    } else if (selectedFilter === 'facilities' || (selectedFilter === 'show_all' && contactDetail.facilities)) {
      return (
        <Table bordered>
          <tbody>
          <tr>
            <td width="250" style={{ textAlign: 'center' }}><h6>승인 코드</h6></td>
            <td width="400">: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>편의시설 코드</h6></td>
            <td>: {contactDetail.facilities.facilitiesCode || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>타입</h6></td>
            <td>: {contactDetail.facilities.facilitiesClass || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>시설물 이름</h6></td>
            <td>: {contactDetail.facilities.facilitiesName || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>분류</h6></td>
            <td>: {contactDetail.facilities.type || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>담당자</h6></td>
            <td>: {contactDetail.facilities.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>위치</h6></td>
            <td>: {contactDetail.facilities.location || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>운행 상태</h6></td>
            <td>: {contactDetail.facilities.status || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>비고</h6></td>
            <td>: {contactDetail.facilities.note || 'N/A'}</td>
          </tr>
          </tbody>
          </Table>
      );
    } else if (selectedFilter === 'gate' || (selectedFilter === 'show_all' && contactDetail.gate)) {
      return (
         <Table bordered>
          <tbody>
          <tr>
            <td width="250" style={{ textAlign: 'center' }}><h6>승인 코드</h6></td>
            <td width="400"> {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>비행기 코드</h6></td>
            <td> {contactDetail.gate.airplane?.airplaneCode || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>게이트 코드</h6></td>
            <td> {contactDetail.gate.gateCode || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>담당자</h6></td>
            <td> {contactDetail.gate.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>상태</h6></td>
            <td> {contactDetail.gate.status || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>타입</h6></td>
            <td> {contactDetail.gate.type || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>위치</h6></td>
            <td> {contactDetail.gate.location || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>항공사</h6></td>
            <td> {contactDetail.gate.airplane?.airline || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>편명</h6></td>
            <td> {contactDetail.gate.airplane?.flightid || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>도착공항명</h6></td>
            <td> {contactDetail.gate.airplane?.airport || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>등록 일자</h6></td>
            <td> {contactDetail.gate.registrationDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>수정 일자</h6></td>
            <td> {contactDetail.gate.modifiedDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>최근 점검 일자</h6></td>
            <td> {contactDetail.gate.lastInspectionDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>승인 요청 일자</h6></td>
            <td> {contactDetail.gate.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>비고</h6></td>
            <td> {contactDetail.gate.note || 'N/A'}</td>
          </tr>
          </tbody>
          </Table>

      );
    } else if (selectedFilter === 'storage' || (selectedFilter === 'show_all' && contactDetail.storage)) {
      return (
        <Table bordered>
          <tbody>
          <tr>
            <td width="250" style={{ textAlign: 'center' }}><h6>승인 코드</h6></td>
            <td width="400">: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>창고 코드</h6></td>
            <td>: {contactDetail.storage.storageCode || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>대분류</h6></td>
            <td>: {contactDetail.storage.category || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>담당 부서</h6></td>
            <td>: {contactDetail.storage.department || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>담당자</h6></td>
            <td>: {contactDetail.storage.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>사용 기간</h6></td>
            <td>: {contactDetail.storage.period || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>위치</h6></td>
            <td>: {contactDetail.storage.location || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>상태</h6></td>
            <td>: {contactDetail.storage.status || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>수정일자</h6></td>
            <td>: {contactDetail.storage.modifiedDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>타입</h6></td>
            <td>: {contactDetail.storage.type || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>비고</h6></td>
            <td>: {contactDetail.storage.note || 'N/A'}</td>
          </tr>
          </tbody>
          </Table>
      );
    } else if (selectedFilter === 'store' || (selectedFilter === 'show_all' && contactDetail.store)) {
      return (
        <Table bordered>
          <tbody>
          <tr>
            <td width="250" style={{ textAlign: 'center' }}><h6>승인 코드</h6></td>
            <td width="400">: {contactDetail.approvalCode}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>점포 아이디</h6></td>
            <td>: {contactDetail.store.storeId || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>타입</h6></td>
            <td>: {contactDetail.store.type || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>점포명</h6></td>
            <td>: {contactDetail.store.storeName || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>담당자</h6></td>
            <td>: {contactDetail.store.manager || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>상태</h6></td>
            <td>: {contactDetail.store.status || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>연락처</h6></td>
            <td>: {contactDetail.store.storeContact || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>운영시간</h6></td>
            <td>: {contactDetail.store.storeOperatingTime || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>취급물품</h6></td>
            <td>: {contactDetail.store.storeItems || 'N/A'}</td>
          </tr>
          
          <tr>
            <td style={{ textAlign: 'center' }}><h6>주요 업무</h6></td>
            <td>: {contactDetail.store.storeWork || 'N/A'}</td>
          </tr>
          <tr>
            <td><h6>승인 요청 일자</h6></td>
            <td>: {contactDetail.store.createdDate || 'N/A'}</td>
          </tr>
          <tr>
            <td style={{ textAlign: 'center' }}><h6>비고</h6></td>
            <td>: {contactDetail.store.storeExtra || 'N/A'}</td>
          </tr>
          </tbody>
          </Table>
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
                <h5> {contactDetail.checkinCounter.approvalRequester.userName || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.baggageClaim && (
              <div>
                <h5>{contactDetail.baggageClaim.approvalRequester.userName  || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.facilities && (
              <div>
                <h5>{contactDetail.facilities.approvalRequester.userName  || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.gate && (
              <div>
                <h5>{contactDetail.gate.approvalRequester.userName  || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.storage && (
              <div>
                <h5> {contactDetail.storage.approvalRequester.userName  || 'N/A'}</h5>
              </div>
            )}
            {contactDetail.store && (
              <div>
                <h5>{contactDetail.store.approvalRequester.userName  || 'N/A'}</h5>
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
            <img   src={
                contactDetail.checkinCounter?.approvalRequester?.userImg ||
                contactDetail.storage?.approvalRequester?.userImg ||
                contactDetail.facilities?.approvalRequester?.userImg ||
                contactDetail.baggageClaim?.approvalRequester?.userImg ||
                contactDetail.gate?.approvalRequester?.userImg ||
                contactDetail.store?.approvalRequester?.userImg
            } alt="user" className="rounded-circle" width="46" />
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
          <CustomModal  isOpen={modal} toggle={toggleModal} type = {type} content={content}/>

      </div>
    </>
  );
};

export default ContactDetails;
