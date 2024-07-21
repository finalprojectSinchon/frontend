import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
import ProfileUploader from '../views/auth/imgUpload';




/****Layouts*****/

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

const Dashboard1 = Loadable(lazy(() => import('../views/dashboards/Dashboard1')));
const Airplane = Loadable(lazy(() => import('../views/airplane/Airplane')));
const CheckinCounter = Loadable(lazy(() => import('../views/airplane/CheckinCounter')));
const CheckinCounterDetail = Loadable(lazy(() => import('../views/airplane/CheckinCounterDetail')));
const Gate = Loadable(lazy(() => import('../views/airplane/Gate')));
const GateDetail = Loadable(lazy(() => import('../views/airplane/gateDetail')));
const BaggageClaim = Loadable(lazy(() => import('../views/airplane/BaggageClaim')));
const BaggageClaimDetail = Loadable(lazy(() => import('../views/airplane/BaggageClaimsDetail')));

const Profile = Loadable(lazy(() => import('../views/auth/Profile')));

const Inspection = Loadable(lazy(() => import('../views/inspection/inspection')));
const InspectionDetail = Loadable(lazy(() => import('../views/inspection/inspectionDetail')));
const InspectionUpdate = Loadable(lazy(() => import('../views/inspection/inspectionUpdate')));



const AirportStore = Loadable(lazy(() => import('../views/airportStore/airportStore')));

const Maintenance =  Loadable(lazy(() => import('../views/maintenance/maintenance')));

const AirportStoreDetail = Loadable(lazy(() => import('../views/airportStore/airportStoreDetail')));
const AirportDBUpdate = Loadable(lazy(() => import('../views/airportStore/airportStoreDBUpdate')));


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
      { path: '/airplane', name: 'Airplane', exact: true, element: <Airplane /> },
      { path: '/airplane/checkin-counter', name: 'CheckinCounter', exact: true, element: <CheckinCounter /> },
      { path: '/airplane/checkin-counter/:checkinCounterCode', name: 'CheckinCounterDetail', exact: true, element: <CheckinCounterDetail /> },
      { path: '/airplane/gate', name: 'Gate', exact: true, element: <Gate /> },
      { path: '/airplane/gate/:gateCode', name: 'GateDetail', exact: true, element: <GateDetail /> },
      { path: '/airplane/baggage-claim', name: 'BaggageClaim', exact: true, element: <BaggageClaim /> },
      { path: '/airplane/baggage-claim/:baggageClaimCode', name: 'BaggageClaimDetail', exact: true, element: <BaggageClaimDetail /> },

      { path: '/api/v1/maintenance', name: 'Maintenance', exact: true, element: <Maintenance /> },
      { path: '/api/v1/inspection', name: 'inspection', exact: true, element: <Inspection/> },
      { path: '/api/v1/inspection/:inspectionCode', name: 'inspectionDetail', exact: true, element: <InspectionDetail/> },
      { path: '/api/v1/inspection/inspectionUpdate', name: 'inspectionUpdate', exact: true, element: <InspectionUpdate/> },



      { path: '/dashboards/dashboard1', name: 'Dashboard 1', exact: true, element: <Dashboard1 /> },
  
      { path: '/airport/store', name: 'AirportStore', exact: true, element: <AirportStore /> },
      { path: '/airport/store/:storeId', name: 'AirportStoreDetail', exact: true, element: <AirportStoreDetail /> },
      { path: '/airport/store/dbupdate', name: 'AirportStoreDBUpdate', exact: true, element: <AirportDBUpdate /> },



      { path: '/profile', name: 'profile', exact: true, element: <Profile /> },
      { path: '/upload', name: 'test', exact: true, element: <ProfileUploader /> },
    
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
