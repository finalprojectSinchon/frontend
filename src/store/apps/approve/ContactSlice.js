import axios from 'axios';
import { createSlice ,createAsyncThunk} from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; // import를 잊지 마세요
import api from '../airplane/api';

export const fetchApprove = createAsyncThunk('contacts/fetchManager', async () => {
  const response = await api.get('/api/v1/approve');
  return response.data;
});

const API_URL = 'http://localhost:8080/api/v1/contacts'; // API URL을 명확하게 정의

const initialState = {
  contacts: [],
  contactContent: 1,
  contactSearch: '',
  editContact: false,
  currentFilter: 'show_all',
  approveData:null,
   status: 'idle',  // 상태 관리를 위한 속성 추가
  error: null,  // 오류를 관리하기 위한 속성 추가
  selectedContact: null,
  selectedFilter: 'show_all',
  selectedManager: null,
};

export const ContactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    getContacts: (state, action) => {
      state.contacts = action.payload;
    },
    SearchContact: (state, action) => {
      state.contactSearch = action.payload;
    },
    DeleteContact: (state, action) => {
      const index = state.contacts.findIndex((contact) => contact.id === action.payload);
      state.contacts.splice(index, 1);
    },
    toggleStarredContact: (state, action) => {
      state.contacts = state.contacts.map((contact) =>
        contact.id === action.payload ? { ...contact, starred: !contact.starred } : contact,
      );
    },
    isEdit: (state) => {
      state.editContact = !state.editContact;
    },
    setVisibilityFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
    SelectContact: (state, action) => {
      const { contact, filter, manager } = action.payload;
      state.selectedContact = contact;
      state.selectedFilter = filter;
      state.selectedManager = manager;
    },
    UpdateContact: {
      reducer: (state, action) => {
        state.contacts = state.contacts.map((contact) =>
          contact.id === action.payload.id
            ? { ...contact, [action.payload.field]: action.payload.value }
            : contact,
        );
      },
      prepare: (id, field, value) => {
        return {
          payload: { id, field, value },
        };
      },
    },
    addContact: {
      reducer: (state, action) => {
        state.contacts.push(action.payload);
      },
      prepare: (id, firstname, lastname, image, department, company, phone, email, address, notes) => {
        return {
          payload: {
            id,
            firstname,
            lastname,
            image,
            department,
            company,
            phone,
            email,
            address,
            notes,
            frequentlycontacted: false,
            starred: false,
            deleted: false,
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder
     
    .addCase(fetchApprove.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchApprove.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.approveData = action.payload;  // 승인 데이터를 상태에 저장
    })
    .addCase(fetchApprove.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;  // 오류를 상태에 저장
    });
   
  },
});

export const {
  getContacts,
  SearchContact,
  isEdit,
  SelectContact,
  DeleteContact,
  toggleStarredContact,
  UpdateContact,
  addContact,
  setVisibilityFilter,
} = ContactSlice.actions;

export const fetchContacts = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const response = await  api.get('/api/v1/approve');
    console.log('response',response)
    const contacts = response.data.data.approvalList;

    const filteredContacts = contacts.filter(contact => {
      console.log('contact11111',contact)
      if (state.contacts.currentFilter === 'show_all') {
        return true;
      }else if(contact.baggageClaim){
        return contact.baggageClaim === state.contacts.currentFilter;
      }else if(contact.checkinCounter){
        return contact.checkinCounter === state.contacts.currentFilter;

      }else if(contact.facilities){
        return contact.facilities === state.contacts.currentFilter;

      }else if(contact.gate){
        return contact.gate === state.contacts.currentFilter;

      }else if(contact.storage){
        return contact.storage === state.contacts.currentFilter;

      }else if(contact.store){
        return contact.store === state.contacts.currentFilter;

      }
    });

    dispatch(getContacts(filteredContacts));
  } catch (err) {
    console.error('Failed to fetch contacts:', err);
  }
};

export default ContactSlice.reducer;
