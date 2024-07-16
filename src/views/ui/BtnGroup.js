import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';

const BtnGroups = () => {
  const [isOpen1, setIsOpen1] = useState(false);


  const toggle1 = () => {
    setIsOpen1(!isOpen1);
  };



  return (
    <div>
      <BreadCrumbs />
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
      <Row>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-1*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Button Group">
            <ButtonGroup>
              <Button color='primary'>Left</Button>
              <Button color='primary'>Middle</Button>
              <Button color='primary'>Right</Button>
            </ButtonGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-2*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Button Toolbar">
            <ButtonToolbar>
              <ButtonGroup className="me-2">
                <Button color="primary">
                  1
                </Button>
                <Button color="primary">
                  2
                </Button>
                <Button color="primary">
                  3
                </Button>
                <Button color="primary">
                  4
                </Button>
              </ButtonGroup>
              <ButtonGroup className="me-2">
                <Button>
                  5
                </Button>
                <Button>
                  6
                </Button>
                <Button>
                  7
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button color="info">
                  8
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </ComponentCard>
        </Col>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-3*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Nesting">
            <ButtonGroup>
              <Button color='primary'>1</Button>
              <Button color='primary'>2</Button>
              <ButtonDropdown isOpen={isOpen1} toggle={toggle1.bind(null)}>
                <DropdownToggle color='primary' caret>Dropdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Dropdown Link</DropdownItem>
                  <DropdownItem>Dropdown Link</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ButtonGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Sizing">
            <ButtonGroup size="lg">
              <Button color='outline-primary'>Left</Button>
              <Button color='outline-primary'>Middle</Button>
              <Button color='outline-primary'>Right</Button>
            </ButtonGroup>
            <br />
            <ButtonGroup className="mt-2">
              <Button color='outline-primary'>Left</Button>
              <Button color='outline-primary'>Middle</Button>
              <Button color='outline-primary'>Right</Button>
            </ButtonGroup>
            <br />
            <ButtonGroup className="mt-2" size="sm">
              <Button color='outline-primary'>Left</Button>
              <Button color='outline-primary'>Middle</Button>
              <Button color='outline-primary'>Right</Button>
            </ButtonGroup>
          </ComponentCard>
        </Col>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Mixed Styles">
            <div>
            <ButtonGroup>
              <Button color="danger">
                Left
              </Button>
              <Button color="warning">
                Middle
              </Button>
              <Button color="success">
                Right
              </Button>
            </ButtonGroup>
            </div>
            <div className='mt-2'>
            <ButtonGroup>
              <Button color="light-warning">
                Left
              </Button>
              <Button color="light-info">
                Middle
              </Button>
              <Button color="light-danger">
                Right
              </Button>
            </ButtonGroup>
            </div>
            <div className='mt-2'>
            <ButtonGroup>
              <Button color="light-success">
                Left
              </Button>
              <Button color="light-danger">
                Middle
              </Button>
              <Button color="light-warning">
                Right
              </Button>
            </ButtonGroup>
            </div>
          </ComponentCard>
        </Col>
        <Col xs="12" md="4">
          {/* --------------------------------------------------------------------------------*/}
          {/* Card-4*/}
          {/* --------------------------------------------------------------------------------*/}
          <ComponentCard title="Vertical variation">
            <ButtonGroup vertical>
              <Button color="danger">
                Button
              </Button>
              <Button color="warning">
                Button
              </Button>
              <Button color="success">
                Button
              </Button>
            </ButtonGroup>
          </ComponentCard>
        </Col>
      </Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* Row*/}
      {/* --------------------------------------------------------------------------------*/}
    </div>
  );
};

export default BtnGroups;
