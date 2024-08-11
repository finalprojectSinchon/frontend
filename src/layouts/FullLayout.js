import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {Button, Container, Modal, ModalBody, ModalHeader, Toast, ToastBody, ToastHeader} from 'reactstrap';
import Header from './header/Header';
import Customizer from './customizer/Customizer';
import Sidebar from './sidebars/vertical/Sidebar';
import HorizontalHeader from './header/HorizontalHeader';
import HorizontalSidebar from './sidebars/horizontal/HorizontalSidebar';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {addUser, fetchUsers} from '../store/apps/login/userSlice';
import {clearSosAlert, connectWebSocket, disconnectWebSocket} from '../store/apps/websocket/WebSocketSlice';
import api from "src/store/apps/airplane/api.js";

const FullLayout = () => {
  const customizerToggle = useSelector((state) => state.customizer.customizerSidebar);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);
  const isFixedSidebar = useSelector((state) => state.customizer.isSidebarFixed);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInfo);

  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false);

  const toastMessage = useSelector(state => state.websocket.toastMessage);


  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (userInfo.userCode && !isWebSocketConnected) {
      dispatch(connectWebSocket(userInfo.userCode));
      setIsWebSocketConnected(true);
    }

    return () => {
      if (isWebSocketConnected) {
        dispatch(disconnectWebSocket());
        setIsWebSocketConnected(false);
      }
    };
  }, [dispatch, userInfo.userCode, isWebSocketConnected]);

  const sosAlert = useSelector(state => state.websocket.sosAlert);

  const handleCloseAlert = () => {
    dispatch(clearSosAlert());
  };

  useEffect(() => {
    if (userInfo.userCode === null) {
      api.get('/user-info')
          .then(res => res.data)
          .then(data => {
            dispatch(addUser(data.data));
          })
          .catch(error => {
            console.error('Error fetching user info:', error);
            navigate('/auth/loginformik')
          });
    } else if (userInfo.isActive !== "Y"){
      navigate('/auth/permission-error')
    } else if (userInfo.userRole === "ROLE_USER") {

    }
  }, [dispatch, userInfo]);

  const [showToast, setShowToast] = useState(false);
  const [toastImg, setToastImg] = useState()



  useEffect(() => {
    if(toastMessage?.type !== "SOS_ALERT") {
      if (toastMessage?.message) {
        setShowToast(true);
        api.get(`/api/v1/chat/img/${toastMessage.from}`)
            .then(res => res.data)
            .then(data => {
              setToastImg(data.data);
              const timer = setTimeout(() => setShowToast(false), 5000);
              return () => clearTimeout(timer);
            })
            .catch(error => console.error('err!', error))
        // 3초 후에 토스트 메시지 숨기기
      }
    }
  }, [toastMessage]);


  return (
      <main>
        <div
            className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? 'isMiniSidebar' : ''}`}
        >
          <Toast isOpen={showToast} style={{ position: 'fixed', bottom : '20px', right: '20px', zIndex: 9999 }}>
            <ToastHeader toggle={() => setShowToast(false)}>
              새 메시지
            </ToastHeader>
            <ToastBody>
              <div className="d-flex align-items-center">
                <img
                    src={toastImg?.toastImg || 'default-profile-image.jpg'}
                    alt="User Profile"
                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
                <div>
                  <strong>{toastImg?.toastName || '알 수 없는 사용자'}</strong>
                  <p className="mb-0">{toastMessage?.message}</p>
                </div>
              </div>
            </ToastBody>
          </Toast>

          {/******** Sidebar **********/}
          {LayoutHorizontal ? (
              ''
          ) : (
              <aside className={`sidebarArea ${showMobileSidebar ? 'showSidebar' : ''}`}>
                <Sidebar />
              </aside>
          )}
          {/********Content Area**********/}

          <div className={`contentArea ${topbarFixed ? 'fixedTopbar' : ''}`}>
            {/********header**********/}
            {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
            {LayoutHorizontal ? <HorizontalSidebar /> : ''}
            {/********Middle Content**********/}
            <Container fluid className="p-4 boxContainer">
              <div className={isFixedSidebar && LayoutHorizontal ? 'HsidebarFixed' : ''}>
                <Outlet />
              </div>
              <Customizer className={customizerToggle ? 'showCustomizer' : ''} />
              {showMobileSidebar || customizerToggle ? <div className="sidebarOverlay" /> : ''}
            </Container>
          </div>
          <Modal isOpen={!!sosAlert} toggle={handleCloseAlert}>
            <ModalHeader toggle={handleCloseAlert}>긴급 알림</ModalHeader>
            <ModalBody>
              <p style={{color: 'red', fontSize: '30px', marginTop: '10px', textAlign: 'center'}}>
                {sosAlert}
              </p>
              <Button color="danger" onClick={handleCloseAlert}>확인</Button>
            </ModalBody>
          </Modal>
        </div>
      </main>
  );
};

export default FullLayout;
