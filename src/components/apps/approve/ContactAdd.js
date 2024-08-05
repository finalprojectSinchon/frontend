import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Button,
  Input,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../../store/apps/approve/ContactSlice';

const ContactAdd = ({ click }) => {
  const id = useSelector((state) => state.contacts.contacts.length);
  const dispatch = useDispatch();
  const [values, setValues] = React.useState({
    firstname: '',
    lastname: '',
    department: '',
    company: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addContact(
        id,
        values.firstname,
        values.lastname,
        'path/to/default/image.jpg', // 직접 경로 설정
        values.department,
        values.company,
        values.phone,
        values.email,
        values.address,
        values.notes,
      ),
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ModalBody>
        <Row>
          <Col md={6} className="text-center">
            <img src='path/to/default/image.jpg' className="rounded-circle" alt={id} width="100" />
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                className="form-control"
                type="text"
                name="firstname"
                id="firstName"
                value={values.firstname}
                onChange={(e) => setValues({ ...values, firstname: e.target.value })}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                className="form-control"
                type="text"
                name="lastname"
                id="lastName"
                value={values.lastname}
                onChange={(e) => setValues({ ...values, lastname: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>
        {/* 나머지 필드들 */}
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          type="submit"
          onClick={click}
          disabled={values.firstname.length === 0 || values.notes.length === 0}
        >
          Add Contact
        </Button>
      </ModalFooter>
    </Form>
  );
};

ContactAdd.propTypes = {
  click: PropTypes.any,
};

export default ContactAdd;
