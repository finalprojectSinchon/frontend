import React, { useState } from 'react';

import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
  InputGroup,
  InputGroupText,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback,
} from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../components/ComponentCard';

const BasicForm = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);

  const toggleDropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDropDown1 = () => {
    setDropdownOpen1(!dropdownOpen1);
  };

  return (
    <div>
      <BreadCrumbs />
      {/*--------------------------------------------------------------------------------*/}
      {/* Start Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
      <Row>
        {/*--------------------------------------------------------------------------------*/}
        {/* Ordinary Form                                                                  */}
        {/*--------------------------------------------------------------------------------*/}
        {/* <Col md="12">
          <ComponentCard title="Ordinary Form">
            <Form>
              <FormGroup>
                <Label htmlFor="exampleEmail12">Email Address</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail12"
                  placeholder="Email address Here"
                />
                <FormText color="muted">
                  We&apos;ll never share your email with anyone else.
                </FormText>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="examplePassword2">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword2"
                  placeholder="Password Here"
                />
              </FormGroup>
              <FormGroup check>
                <Input type="checkbox" id="exampleCustomCheckbox" />
                <Label check className='form-label'>Check Me Out!</Label>
              </FormGroup>
              <Button color="primary">Submit</Button>
            </Form>
          </ComponentCard>
        </Col> */}
        {/*--------------------------------------------------------------------------------*/}
        {/* Default Form                                                                   */}
        {/*--------------------------------------------------------------------------------*/}
        {/* <Col md="12">
          <ComponentCard title="Default Form">
            <Form>
              <FormGroup>
                <Label>
                  Default Text <span className="help"> e.g. &quot;George deo&quot;</span>
                </Label>
                <Input type="text" defaultValue="George deo..." />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="example-email">
                  Email <span className="help"> e.g. &quot;example@gmail.com&quot;</span>
                </Label>
                <Input type="email" id="example-email" name="example-email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type="password" defaultValue="password" />
              </FormGroup>
              <FormGroup>
                <Label>Placeholder</Label>
                <Input type="text" placeholder="placeholder" />
              </FormGroup>
              <FormGroup>
                <Label>Text area</Label>
                <Input type="textarea" rows="5" />
              </FormGroup>
              <FormGroup>
                <Label>Read only input</Label>
                <Input type="text" placeholder="Readonly input here…" readOnly />
              </FormGroup>
              <FormGroup>
                <fieldset disabled>
                  <Label htmlFor="disabledTextInput">Disabled input</Label>
                  <Input type="text" id="disabledTextInput" placeholder="Disabled input" />
                </fieldset>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="4">
                    <FormGroup check>
                      <Input type="checkbox" id="check1" />
                      <Label check className='form-label'>Check this custom checkbox</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input type="checkbox" id="check2" />
                      <Label check className='form-label'>Check this custom checkbox</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input type="checkbox" id="check3" />
                      <Label check className='form-label'>Check this custom checkbox</Label>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <FormGroup check>
                        <Input type="radio" name="radio1" />
                        <Label check className='form-label'>Toggle this custom radio</Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="radio" name="radio1" />
                        <Label check className='form-label'>Toggle this custom radio</Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input type="radio" name="radio1" />
                        <Label check className='form-label'> Toggle this custom radio</Label>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>Select Years</Label>
                <Input type="select">
                  <option>Choose here...</option>
                  <option>One</option>
                  <option>Two</option>
                  <option>Three</option>
                  <option>Four</option>
                  <option>Five</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="exampleFile">Default File</Label>
                <Input type="file" placeholder="" />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="helptext">Help Text</Label>
                <Input type="text" name="help" id="helptext" placeholder="Helping Text Here" />
                <FormText color="muted">
                  A block of help text that breaks onto a new line and may extend beyond one line.
                </FormText>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col> */}
        {/*--------------------------------------------------------------------------------*/}
        {/* Highlighted Header Form                                                        */}
        {/*--------------------------------------------------------------------------------*/}
        <Col md="12">
          <Card>
            {/* <CardTitle tag="h4" className="border-bottom bg-primary p-3 mb-0 text-white">
              Highlighted Header Form
            </CardTitle> */}
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                체크인 카운터
              </CardTitle>
            </CardBody>
            <CardBody>
              <Form>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>location</Label>
                      <Input type="text" placeholder="위치를 입력하세요 " valid />
                      <FormFeedback valid>Success! You&apos;ve done it.</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Status</Label>
                      <Input type="select" name="Select Gender">
                        <option>정상</option>
                        <option>고장</option>
                        <option>점검중</option>
                      </Input>
                      <FormText className="muted">This field has error.</FormText>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label>type</Label>
                      <Input type="select" placeholder="12n" >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                      </Input>
                      <FormText className="muted">Select your type</FormText>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>항공사</Label>
                      <Input type="text" name="Select Category" invalid/>
                      <FormFeedback>Sorry, that username&apos;s taken. Try another?</FormFeedback>
                    </FormGroup>
                  </Col>
               
                </Row>
                <Row>
                   <Col md="6">
                    <FormGroup>
                    <Label>편명</Label>
                    <Input type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>최근 점검일</Label>
                      <Input type="date" placeholder="DOB Here" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                    <Label>도착예정시간</Label>
                    <Input type="datetime-local" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>지연시간</Label>
                      <Input type="number" placeholder="지연시간을 입력하세요" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                    <Label>도착공항명</Label>
                    <Input type="text" />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>비고</Label>
                      <Input type="textarea" placeholder="특이사항을 입력하세요"  rows="6" />
                    </FormGroup>
                  </Col>
                
                </Row>
              <Col className='d-flex justify-content-center'>
                <Button className="btn " color="primary"  >
                  primary
                </Button>
                <Button className="btn" color="secondary" >
                  secondary
                </Button>
                </Col>
              </Form>
            </CardBody>
   
          </Card>
        </Col>
     
      </Row>
      {/*--------------------------------------------------------------------------------*/}
      {/*End Inner Div*/}
      {/*--------------------------------------------------------------------------------*/}
    </div>
  );
};

export default BasicForm;
