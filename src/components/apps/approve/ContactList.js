import React, { useEffect, useState } from 'react';
import { Nav } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import {
  SelectContact,
  fetchContacts,
  DeleteContact,
  toggleStarredContact,
  fetchApprove,
} from 'src/store/apps/approve/ContactSlice.js';
import ContactListItem from './ContactListItem';
import './Style.css';

const ContactList = () => {
  const dispatch = useDispatch();
  const [managers, setManagers] = useState([]);


  const contacts = useSelector(state => state.contacts.contacts);
  const selectedContactId = useSelector(state => state.contacts.selectedContactId);
  const searchTerm = useSelector(state => state.contacts.contactSearch);

  const handleClick = (contactId) => {
    dispatch(SelectContact({ contactId }));
  };

  const approves = useSelector(state => state.contacts.approveData);
  const currentFilter = useSelector(state => state.contacts.currentFilter);
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

  const getVisibleContacts = (approveList, filter, searchTerm) => {
    let filteredContacts = approveList;

    if (filter !== 'show_all') {
      filteredContacts = filteredContacts.filter(contact => {
        if (filter === 'baggage_claim' && contact.baggageClaim) return true;
        if (filter === 'gate' && contact.gate) return true;
        if (filter === 'checkin_counter' && contact.checkinCounter) return true;
        if (filter === 'store' && contact.store) return true;
        if (filter === 'storage' && contact.storage) return true;
        if (filter === 'facilities' && contact.facilities) return true;
        return false;
      });
    }

    if (searchTerm) {
      filteredContacts = filteredContacts.filter(contact =>
        contact.checkinCounter?.manager.includes(searchTerm) ||
        contact.baggageClaim?.manager.includes(searchTerm) ||
        contact.facilities?.manager.includes(searchTerm) ||
        contact.gate?.manager.includes(searchTerm) ||
        contact.storage?.manager.includes(searchTerm) ||
        contact.store?.manager.includes(searchTerm)
      );
    }

    return filteredContacts;
  };

  const approveList = approves?.data?.approvalList || [];
  const visibleContacts = getVisibleContacts(approveList, currentFilter, searchTerm);

  // 승인 상태에 따라 정렬
  const sortedContacts = [...visibleContacts].sort((a, b) => {
    if (a.status === 'Y' && b.status !== 'Y') return 1;
    if (a.status !== 'Y' && b.status === 'Y') return -1;
    return 0;
  });

  return (
    <Nav>
      {sortedContacts.map(contact => (
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
