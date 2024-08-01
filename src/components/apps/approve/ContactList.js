import React, { useEffect, useState } from 'react';
import { Nav } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectContact,
  fetchContacts,
  DeleteContact,
  toggleStarredContact,
  fetchApprove,
} from '../../../store/apps/approve/ContactSlice';
import ContactListItem from './ContactListItem';

const ContactList = () => {
  const dispatch = useDispatch();
  const [managers, setManagers] = useState([]);

  const approves = useSelector(state => state.contacts.approveData);
  const currentFilter = useSelector(state => state.contacts.currentFilter);
  const contactSearch = useSelector(state => state.contacts.contactSearch);
  const active = useSelector(state => state.contacts.contactContent);

  useEffect(() => {
    dispatch(fetchApprove());
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (approves && approves.data) {
      const approveList = approves.data.approvalList || [];
      const newManagers = [];

      approveList.forEach(approve => {
        if (approve.checkinCounter) {
          newManagers.push({ manager: approve.checkinCounter.manager, type: 'checkin_counter' });
        }
        if (approve.baggageClaim) {
          newManagers.push({ manager: approve.baggageClaim.manager, type: 'baggage_claim' });
        }
        if (approve.facilities) {
          newManagers.push({ manager: approve.facilities.manager, type: 'facilities' });
        }
        if (approve.gate) {
          newManagers.push({ manager: approve.gate.manager, type: 'gate' });
        }
        if (approve.storage) {
          newManagers.push({ manager: approve.storage.manager, type: 'storage' });
        }
        if (approve.store) {
          newManagers.push({ manager: approve.store.manager, type: 'store' });
        }
      });
      setManagers(newManagers);
    }
  }, [approves]);

  const getVisibleContacts = (approveList, filter, contactSearch) => {
    if (filter === 'show_all') {
      return approveList;
    }
    const filteredContacts = [];
    if (filter === 'baggage_claim') {
      filteredContacts.push(...approveList.filter(c => c.baggageClaim));
    }
    if (filter === 'gate') {
      filteredContacts.push(...approveList.filter(c => c.gate));
    }
    if (filter === 'checkin_counter') {
      filteredContacts.push(...approveList.filter(c => c.checkinCounter));
    }
    if (filter === 'store') {
      filteredContacts.push(...approveList.filter(c => c.store));
    }
    if (filter === 'storage') {
      filteredContacts.push(...approveList.filter(c => c.storage));
    }
    if (filter === 'facilities') {
      filteredContacts.push(...approveList.filter(c => c.facilities));
    }
    return filteredContacts;
  };

  const approveList = approves?.data?.approvalList || [];
  const visibleContacts = getVisibleContacts(approveList, currentFilter, contactSearch);

  return (
    <Nav>
      {visibleContacts.map(contact => (
        <ContactListItem
          key={contact.approvalCode}
          active={active}
          {...contact}
          onContactClick={() => {
            dispatch(SelectContact({
              contact: contact,
              filter: currentFilter,
              manager: contact.manager
            }));
          }}
          onDeleteClick={() => dispatch(DeleteContact(contact.approvalCode))}
          onStarredClick={() => dispatch(toggleStarredContact(contact.approvalCode))}
        />
      ))}
    </Nav>
  );
};

export default ContactList;
