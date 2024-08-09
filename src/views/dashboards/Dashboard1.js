import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import React from "react";
import NoiseChart from "src/views/dashboards/NoiseChart.js";
import WeatherCard from "./WeatherCard";
import AirQuality from "src/views/dashboards/AirQuality.js";
import DataChart from './Datachart';
import EquipmentChart from './EquipmentChart';
import EquimentChart from './EquimentCharts.js'


const Dashboard1 = () => {

    return (
    <>
      <BreadCrumbs />
      <DataChart/>
      <EquipmentChart/>
      <Row>
        <AirQuality/>
      </Row>
      <Row>
        <Col lg="6">
          <WeatherCard/>
        </Col>
          <NoiseChart/>
      </Row>
      <Row>
        <EquipmentChart/>
      </Row>


    </>
  );
};

export default Dashboard1;
