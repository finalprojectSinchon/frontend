import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';


/****Layouts*****/

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

const Dashboard1 = Loadable(lazy(() => import('../views/dashboards/Dashboard1')));
const Airplane = Loadable(lazy(() => import('../views/airplane/Airplane')));
const CheckinCounter = Loadable(lazy(() => import('../views/airplane/CheckinCounter')));
const Gate = Loadable(lazy(() => import('../views/airplane/Gate')));
const GateDetail = Loadable(lazy(() => import('../views/airplane/gateDetail')));
const Profile = Loadable(lazy(() => import('../views/auth/Profile')));
const AirportStore = Loadable(lazy(() => import('../views/airportStore/airportStore')));

/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));


/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element: <Navigate to="/auth/loginformik" /> },
      { path: '/api/v1/airplane', name: 'Airplane', exact: true, element: <Airplane /> },
      { path: '/api/v1/airplane/checkin-counter', name: 'CheckinCounter', exact: true, element: <CheckinCounter /> },
      { path: '/api/v1/airplane/gate', name: 'Gate', exact: true, element: <Gate /> },
      { path: '/api/v1/airplane/gate/:gateCode', name: 'GateDetail', exact: true, element: <GateDetail /> },

      { path: '/dashboards/dashboard1', name: 'Dashboard 1', exact: true, element: <Dashboard1 /> },
  
      { path: '/airport/store', name: 'Dashboard 1', exact: true, element: <AirportStore /> },
 
      { path: '/profile', name: 'profile', exact: true, element: <Profile /> },
    
      { path: '/casl', name: 'casl', exact: true, element: <CASL /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: 'registerformik', element: <RegisterFormik /> },
      { path: 'loginformik', element: <LoginFormik /> },
    ],
  },
];

export default ThemeRoutes;
