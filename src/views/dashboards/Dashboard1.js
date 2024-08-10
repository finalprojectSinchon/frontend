import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import React, {useEffect} from "react";
import NoiseChart from "src/views/dashboards/NoiseChart.js";
import WeatherCard from "./WeatherCard";
import AirQuality from "src/views/dashboards/AirQuality.js";
import DataChart from './Datachart';
import MaintenanceChart from './MaintenanceChart.js';
import UserViews from "src/views/dashboards/UserViews.js";
import Map from "src/views/dashboards/Map.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const Dashboard1 = () => {

    const userInfo = useSelector((state) => state.userInfo);
    const navigate = useNavigate();
    useEffect(() => {
        if(userInfo){
            if(userInfo.userRole == "ROLE_USER"){
                navigate('/profile');
            }
        }

    }, [userInfo]);

  return (
      <>
        <BreadCrumbs />

        <Row>
          <Col lg="5">
            <WeatherCard/>
            <AirQuality/>
          </Col>
          <Col lg="7">
            <Row>
              <Col lg="6">
                <MaintenanceChart/>
                  <UserViews/>
              </Col>
              <Col lg="6">
                <NoiseChart/>
              </Col>
                <Map/>
            </Row>
          </Col>
        </Row>

        <Row>
          <DataChart/>
        </Row>

      </>
  );
};

export default Dashboard1;
