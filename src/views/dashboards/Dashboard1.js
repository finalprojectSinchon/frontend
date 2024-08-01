import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import SalesOverview from '../../components/dashboard/dashboard1/SalesOverview';
import OurVisitors from '../../components/dashboard/dashboard1/OurVisitors';
import ProfileCard from '../../components/dashboard/dashboard1/ProfileCard';
import Blogs from '../../components/dashboard/dashboard1/Blogs';
import Feeds from '../../components/dashboard/dashboard1/Feeds';
import NewsletterCampaign from '../../components/dashboard/dashboard1/NewsletterCampaign';
import Timeline from '../../components/dashboard/dashboard1/Timeline';
import MyContact from '../../components/dashboard/dashboard1/MyContact';
import Downloads from '../../components/dashboard/dashboard1/Downloads';
import BandwidthUsage from '../../components/dashboard/dashboard1/BandwidthUsage';
import React from "react";
import NoiseChart from "src/views/dashboards/NoiseChart.js";
import WeatherCard from "./WeatherCard";
import AirQuality from "src/views/dashboards/AirQuality.js";
import DataChart from './Datachart';


const Dashboard1 = () => {

    return (
    <>
      <BreadCrumbs />
      <DataChart/>
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
        <Col lg="8">
          <SalesOverview />
        </Col>
        <Col lg="4">
          <OurVisitors />
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <Feeds />
        </Col>
        <Col lg="8">
          <NewsletterCampaign />
        </Col>
      </Row>
      <Blogs />
      <Row>        
        <Col lg="4">
          <BandwidthUsage />
        </Col>
        <Col lg="4">
          <Downloads />
        </Col>
        <Col lg="4">

        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <ProfileCard />
          <MyContact />
        </Col>
        <Col lg="8">
          <Timeline />
        </Col>
      </Row>
      
    </>
  );
};

export default Dashboard1;
