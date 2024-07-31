import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Header from './header/Header';
import Customizer from './customizer/Customizer';
import Sidebar from './sidebars/vertical/Sidebar';
import HorizontalHeader from './header/HorizontalHeader';
import HorizontalSidebar from './sidebars/horizontal/HorizontalSidebar';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { addUser } from '../store/apps/login/userSlice';
import { connectWebSocket, disconnectWebSocket } from '../store/apps/websocket/WebSocketSlice';

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

  useEffect(() => {
    if (userInfo.userCode === null) {
      axios.get('http://localhost:8080/user-info', {
        headers: {
          Authorization: Cookies.get('token')
        }
      })
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
    }
  }, [dispatch, userInfo]);

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


  return (
      <main>
        <div
            className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? 'isMiniSidebar' : ''}`}
        >
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
        </div>
      </main>
  );
};

export default FullLayout;
