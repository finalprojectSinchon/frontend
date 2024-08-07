import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/loader/Loadable';
import ProfileUploader from '../views/auth/imgUpload';
import { element, exact } from 'prop-types';




//import MaintenanceRegist from '../views/maintenance/maintenanceRegist';



/****Layouts*****/

const FullLayout = Loadable(lazy(() => import('../layouts/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/BlankLayout')));
/***** Pages ****/

const Dashboard1 = Loadable(lazy(() => import('../views/dashboards/Dashboard1')));
const Airplane = Loadable(lazy(() => import('../views/airplane/Airplane')));
const AirplaneDetail = Loadable(lazy(() => import('../views/airplane/AirplaneDetail')));
const CheckinCounter = Loadable(lazy(() => import('../views/airplane/CheckinCounter')));
const CheckinCounterDetail = Loadable(lazy(() => import('../views/airplane/CheckinCounterDetail')));
const CheckinCounterRegist = Loadable(lazy(() => import('../views/airplane/CheckinCounterRegist')));
const Gate = Loadable(lazy(() => import('../views/airplane/Gate')));
const GateDetail = Loadable(lazy(() => import('../views/airplane/GateDetail')));
const GateRegist = Loadable(lazy(() => import('../views/airplane/GateRegist')));
const BaggageClaim = Loadable(lazy(() => import('../views/airplane/BaggageClaim')));
const BaggageClaimDetail = Loadable(lazy(() => import('../views/airplane/BaggageClaimsDetail')));
const BaggageClaimRegist = Loadable(lazy(() => import('../views/airplane/BaggageClaimRegist')));

// 편의시설
const Facilities = Loadable(lazy(() => import('../views/facilities/facilities')));
const FacilitiesDetail = Loadable(lazy(() => import('../views/facilities/facilitiesDetail')));
const FacilitiesRegist = Loadable(lazy(() => import('../views/facilities/facilitiesRegist')));



const Profile = Loadable(lazy(() => import('../views/auth/Profile')));

const AuthCode = Loadable(lazy(() => import('../views/auth/AuthCode.js')));
const UserContact = Loadable(lazy(() => import('../views/auth/userlist/UserContact.js')));



const Inspection = Loadable(lazy(() => import('../views/inspection/inspection')));
const InspectionDetail = Loadable(lazy(() => import('../views/inspection/inspectionDetail')));
const InspectionUpdate = Loadable(lazy(() => import('../views/inspection/inspectionUpdate')));
const InspectionRegist = Loadable(lazy(() => import('../views/inspection/inspectionRegist')));

const Equipment = Loadable(lazy(() => import('../views/equipment/equipment')));
const EquipmentDetail = Loadable(lazy(() => import('../views/equipment/equipmentDetail')));
const EquipmentUpdate = Loadable(lazy(() => import('../views/equipment/equipmentUpdate')));
const EquipmentRegist = Loadable(lazy(() => import('../views/equipment/equipmentRegist')));



const AirportStore = Loadable(lazy(() => import('../views/airportStore/airportStore')));

const Maintenance =  Loadable(lazy(() => import('../views/maintenance/maintenance.js')));
const MaintenanceDetail = Loadable(lazy(() => import('../views/maintenance/maintenanceDetails')));
const MaintenanceRegist = Loadable(lazy(() => import('../views/maintenance/maintenanceRegist')));

const AirportStoreDetail = Loadable(lazy(() => import('../views/airportStore/airportStoreDetail')));
const AirportDBUpdate = Loadable(lazy(() => import('../views/airportStore/airportStoreDBUpdate')));

const Storage = Loadable(lazy(() => import('../views/storage/Storage')));
const StorageDetail = Loadable(lazy(() => import('../views/storage/StorageDetail')));
const StorageRegist = Loadable(lazy(() => import('../views/storage/StorageRegist')));



/***** CASL Access Control ****/
const CASL = Loadable(lazy(() => import('../views/apps/accessControlCASL/AccessControl')));

/***** Auth Pages ****/
const Error = Loadable(lazy(() => import('../views/auth/Error')));
const Error500 = Loadable(lazy(() => import('../views/auth/Error500')));
const RegisterFormik = Loadable(lazy(() => import('../views/auth/RegisterFormik')));
const LoginFormik = Loadable(lazy(() => import('../views/auth/LoginFormik')));

const PermissionError =  Loadable(lazy(() => import('../views/auth/PermissionError')));
const Certification = Loadable(lazy(() => import('../views/auth/Certification')));


/***** Chatting Pages ****/

const LiveChatting = Loadable(lazy(() => import('../views/chat/LiveChatting.js')));
const CreateQRCodeTest = Loadable(lazy(() => import("src/components/apps/qrCode/CreateQRCode.js")));

// qrCode
const CreateQRCode = Loadable(lazy(() => import("src/views/createQRCode/CreateQRCode.js")));

const ForgotPwd = Loadable(lazy(() => import('../views/auth/forgotPwd.js')));
const FindPassword = Loadable(lazy(() => import('../views/auth/findPassword.js')));

/*  */
const Approve = Loadable(lazy(() => import('../views/approve/Contacts.js')));
//const ContactList = Loadable(lazy(() => import('../apps/approve/ContactList.js'))); // ContactList 경로 추가



/*****Routes******/

const ThemeRoutes = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', name: 'Home', element: <Navigate to="/auth/loginformik" /> },
      { path: '/airplane', name: '비행기', exact: true, element: <Airplane /> },
      { path: '/airplane/:airplaneCode', name: '비행기 상세보기', exact: true, element: <AirplaneDetail/> },
      { path: '/airplane/checkin-counter', name: 'CheckinCounter', exact: true, element: <CheckinCounter /> },
      { path: '/airplane/checkin-counter/:checkinCounterCode', name: 'CheckinCounterDetail', exact: true, element: <CheckinCounterDetail /> },
      { path: '/airplane/checkin-counter/regist', name: 'CheckinCounterRegist', exact: true, element: <CheckinCounterRegist /> },

      { path: '/airplane/gate', name: 'Gate', exact: true, element: <Gate /> },
      { path: '/airplane/gate/:gateCode', name: 'GateDetail', exact: true, element: <GateDetail /> },
      { path: '/airplane/gate/regist', name: 'GateRegist', exact: true, element: <GateRegist /> },
      { path: '/airplane/baggage-claim', name: 'BaggageClaim', exact: true, element: <BaggageClaim /> },
      { path: '/airplane/baggage-claim/:baggageClaimCode', name: 'BaggageClaimDetail', exact: true, element: <BaggageClaimDetail /> },
      { path: '/airplane/baggage-claim/regist', name: 'BaggageClaimRegist', exact: true, element: <BaggageClaimRegist /> },

      { path: '/maintenance', name: 'Maintenance', exact: true, element: <Maintenance /> },
      { path: '/maintenance/:maintenanceCode', name: 'Maintenance', exact: true, element: <MaintenanceDetail /> },
      { path: '/maintenance/regist', name: 'Maintenance', exact: true, element: <MaintenanceRegist /> },

      { path: '/inspection', name: 'inspection', exact: true, element: <Inspection/> },
      { path: '/inspection/:inspectionCode', name: 'inspectionDetail', exact: true, element: <InspectionDetail/> },
      { path: '/inspection/inspectionUpdate', name: 'inspectionUpdate', exact: true, element: <InspectionUpdate/> },
      { path: '/inspection/inspectionRegist', name: 'inspectionRegist', exact: true, element: <InspectionRegist/> },

      { path: '/equipment', name: 'equipment', exact: true, element: <Equipment/> },
      { path: '/equipment/:equipmentCode', name: 'equipmentDetail', exact: true, element: <EquipmentDetail/> },
      { path: '/equipment/equipmentUpdate', name: 'equipmentUpdate', exact: true, element: <EquipmentUpdate/> },
      { path: '/equipment/regist', name: 'equipmentRegist', exact: true, element: <EquipmentRegist/> },

      { path: '/facilities', name: 'Facilities', exact: true, element: <Facilities /> },
      { path: '/facilities/:facilitiesCode', name: 'FacilitiesDetail', exact: true, element:<FacilitiesDetail /> },
      { path: '/facilities/regist', name: 'FacilitiesRegist', exact: true, element:<FacilitiesRegist /> },

      { path: '/dashboards/dashboard1', name: 'Dashboard 1', exact: true, element: <Dashboard1 /> },
  
      { path: '/airport/store', name: 'AirportStore', exact: true, element: <AirportStore /> },
      { path: '/airport/store/:storeId', name: 'AirportStoreDetail', exact: true, element: <AirportStoreDetail /> },
      { path: '/airport/store/dbupdate', name: 'AirportStoreDBUpdate', exact: true, element: <AirportDBUpdate /> },
      { path: '/storage', name: 'Storage', exact: true, element: <Storage /> },
      { path: '/storage/:storageCode', name: 'StorageDetail', exact: true, element: <StorageDetail /> },
      { path: '/storage/regist', name: 'StorageRegist', exact: true, element: <StorageRegist /> },

      { path: '/contact', name: 'userContact', exact: true, element: <UserContact /> },

      { path: '/profile', name: 'profile', exact: true, element: <Profile /> },
      { path: '/upload', name: 'test', exact: true, element: <ProfileUploader /> },
      { path: '/chatting', name: 'chatting', exact: true, element: <LiveChatting /> },

      { path: '/code-issuance', name: 'test', exact: true, element: <AuthCode /> },

      
      { path: '/approve', name: 'approve', exact:true, element: <Approve/> },
      //{ path: '/ContactList', name: 'ContactList', exact: true, element: <ContactList /> }, // ContactList 경로 추가


        // QRTest 용
      { path: '/qrtest', name: 'qrTest', exact:true, element: <CreateQRCodeTest/> },
      // QR 발급 (관)
      { path: '/qrcode', name: 'CreateQRCode', exact:true, element: <CreateQRCode/> },




   


    
      { path: '/casl', name: 'casl', exact: true, element: <CASL /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/500', element: <Navigate to="/auth/500" /> },
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


      { path: 'permission-error', element: <PermissionError /> },
      { path: 'certification', element: <Certification /> },

      { path: 'forgotPwd', element: <ForgotPwd/>},
      { path: 'findPassword', element: <FindPassword/>},
      { path: '500', element: <Error500 /> }
    ],
  },
];

export default ThemeRoutes;
