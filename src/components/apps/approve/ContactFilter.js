import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button, Modal, ModalHeader, UncontrolledCollapse } from 'reactstrap';
import { setVisibilityFilter } from '../../../store/apps/approve/ContactSlice';
import ContactAdd from './ContactAdd';

const ContactFilter = () => {
  const dispatch = useDispatch();
  const active = useSelector((state) => state.contacts.currentFilter);
  const [modal, setModal] = React.useState(false);

  const toggleModal = () => setModal(!modal);

  return (
    <>
      <ListGroup flush>
        <h4 className="px-3 pt-3 text-center font-weight-bold">Filter By Categories</h4>
        <br/>
        <ListGroupItem
          href="#"
          tag="a"
          id="toggler-airplane"
          className="py-3 border-0"
        >
          <i className="bi bi-airplane mx-1" /> 비행기
        </ListGroupItem>
        <UncontrolledCollapse toggler="#toggler-airplane">
          <div className="ml-4">
            <ListGroupItem
              href="#"
              tag="a"
              className={active === 'baggage_claim' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
              onClick={() => dispatch(setVisibilityFilter('baggage_claim'))}
              style={{ paddingLeft: '30px' }}
            >
              <i className="bi bi-luggage mx-1" /> 수하물 수취대
            </ListGroupItem>
            <ListGroupItem
              href="#"
              tag="a"
              className={active === 'gate' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
              onClick={() => dispatch(setVisibilityFilter('gate'))}
              style={{ paddingLeft: '30px' }}
            >
              <i className="bi bi-door-open mx-1" /> 탑승구
            </ListGroupItem>
            <ListGroupItem
              href="#"
              tag="a"
              className={active === 'checkin_counter' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
              onClick={() => dispatch(setVisibilityFilter('checkin_counter'))}
              style={{ paddingLeft: '30px' }}
            >
              <i className="bi bi-person-check mx-1" /> 체크인 카운터
            </ListGroupItem>
          </div>
        </UncontrolledCollapse>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'store' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('store'))}
        >
          <i className="bi bi-shop mx-1" /> 점포
        </ListGroupItem>
        <ListGroupItem
              href="#"
              tag="a"
              className={active === 'storage' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
              onClick={() => dispatch(setVisibilityFilter('storage'))}
            >
              <i className="bi bi-box-seam mx-1" /> 창고
            </ListGroupItem>
        <ListGroupItem
          href="#"
          tag="a"
          className={active === 'facilities' ? 'bg-light py-3 border-0' : 'py-3 border-0'}
          onClick={() => dispatch(setVisibilityFilter('facilities'))}
        >
          <i className="bi bi-shop-window mx-1" /> 편의시설
        </ListGroupItem>
      </ListGroup>
      <Modal isOpen={modal} toggle={toggleModal} size="md">
        <ModalHeader toggle={toggleModal}>Add Contact</ModalHeader>
        <ContactAdd click={toggleModal} />
      </Modal>
    </>
  );
};

export default ContactFilter;