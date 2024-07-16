import React from 'react';
import { Row, Col } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import feathericons from './Ficons';
import ComponentCard from '../../components/ComponentCard';

const FeatherIcons = () => {
  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Card-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <ComponentCard title="Feather">
        <Row>
          {feathericons.map((item) => (
            <Col xs="12" md="6" lg="3" key={item.title}>
              <div className="hstack gap-3 py-3">
                {item.name}
                <span>{item.title}</span>
              </div>
            </Col>
          ))}
        </Row>
      </ComponentCard>
      {/* --------------------------------------------------------------------------------*/}
      {/* End Inner Div*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default FeatherIcons;
