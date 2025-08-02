import { useContext } from "react";
import ContactsContext from "./ContactsContext";

function ContactsList() {
  const { contacts, dispatch, setEditContact } = useContext(ContactsContext);

  return (
    <ul className="contacts-list">
      {contacts.map(c => (
 <li key={c.id} className="contact-item">
 <div className="contact-main">
   <strong>{c.name}</strong>
   <div className="contact-detail-horizontal">
     <span>ایمیل: {c.email}</span>
     <span>شغل: {c.job}</span>
     <span>تلفن: {c.phone}</span>
   </div>
 </div>
 <div className="contact-actions">
   <button onClick={() => setEditContact(c)}>ویرایش</button>
   <button onClick={() => dispatch({ type: "DELETE_CONTACT", payload: c.id })}>
     حذف
   </button>
 </div>
</li>

      ))}
    </ul>
  );
}

export default ContactsList;
