import { useReducer, useState } from "react";
import ContactsContext from "./ContactsContext";

const initialState = [
    { id: 1, name: "Ali", email: "ali@email.com", job: "برنامه‌نویس", phone: "09121234567" },
    { id: 2, name: "Sara", email: "sara@email.com", job: "طراح", phone: "09351234567" }
  ];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CONTACT":
      return [...state, { ...action.payload, id: Date.now() }];
    case "DELETE_CONTACT":
      return state.filter(c => c.id !== action.payload);
    case "EDIT_CONTACT":
      return state.map(c => c.id === action.payload.id ? action.payload : c);
    default:
      return state;
  }
}

export function ContactsProvider({ children }) {
  const [contacts, dispatch] = useReducer(reducer, initialState);
  const [editContact, setEditContact] = useState(null);

  return (
    <ContactsContext.Provider value={{ contacts, dispatch, editContact, setEditContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
