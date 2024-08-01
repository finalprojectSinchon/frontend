import React, { useEffect, useState } from 'react';
import { Nav } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectContact,
  fetchContacts,
  DeleteContact,
  toggleStarredContact,
} from '../../../store/apps/approve/ContactSlice';
import ContactListItem from './ContactListItem';
import { fetchApprove } from '../../../store/apps/approve/ContactSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const [managers, setManagers] = useState([]);

  const approves = useSelector(state => state.contacts.approveData);
  const currentFilter = useSelector(state => state.contacts.currentFilter);
  const contactSearch = useSelector(state => state.contacts.contactSearch);
  const active = useSelector(state => state.contacts.contactContent);

  useEffect(() => {
    dispatch(fetchApprove());
  }, [dispatch]);

  useEffect(() => {
    if (approves && approves.data) {
      const approveList = approves.data.approvalList || [];
      const newManagers = [];

      approveList.forEach(approve => {
        if (approve.checkinCounter) {
          newManagers.push(approve.checkinCounter.manager);
        }
        if (approve.baggageClaim) {
          newManagers.push(approve.baggageClaim.manager);
        }
        if (approve.facilities) {
          newManagers.push(approve.facilities.manager);
        }
        if (approve.gate) {
          newManagers.push(approve.gate.manager);
        }
        if (approve.storage) {
          newManagers.push(approve.storage.manager);
        }
        if (approve.store) {
          newManagers.push(approve.store.manager);
        }
      });
      setManagers(newManagers);
    }
  }, [approves]);
console.log('approves',approves)
  const getVisibleContacts = (approveList, filter, contactSearch) => {
    switch (filter) {
      case 'show_all':
        return approveList.filter(
          (c) => approveList
        );

      case 'baggage_claim':
        return approveList.filter(
          (c) => c.baggageClaim
        );

      case 'gate':
        return approveList.filter(
          (c) => c.gate
        );

      case 'checkin_counter':
        return approveList.filter(
          (c) => c.checkinCounter
        );

      case 'store':
        return approveList.filter(
          (c) => c.store
        );

      case 'storage':
        return approveList.filter(
          (c) => c.storage
        );

      case 'facilities':
        return approveList.filter(
          (c) => c.facilities
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const approveList = approves?.data?.approvalList || [];
  const visibleContacts = getVisibleContacts(
    approveList,
    currentFilter,
    contactSearch
  );

  return (
    <Nav>
      {visibleContacts.map((contact) => (
        <ContactListItem
          key={contact.approvalCode}
          
          active={active}
          {...contact}
          onContactClick={() => dispatch(SelectContact(contact.approvalCode))}
          onDeleteClick={() => dispatch(DeleteContact(contact.approvalCode))}
          onStarredClick={() => dispatch(toggleStarredContact(contact.approvalCode))}
        />
      ))}
    </Nav>
  );
};

export default ContactList;
