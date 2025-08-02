import { useContext, useState, useEffect } from "react";
import ContactsContext from "./ContactsContext";

function AddContactForm() {
  const { dispatch, editContact, setEditContact } = useContext(ContactsContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
      setJob(editContact.job || "");
      setPhone(editContact.phone || "");
    } else {
      setName("");
      setEmail("");
      setJob("");
      setPhone("");
    }
    setError("");
  }, [editContact]);

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !job.trim() || !phone.trim()) {
      setError("همه‌ی اینپوت ها باید پر شوند!");
      return;
    }
    setError("");
    if (editContact) {
      dispatch({ type: "EDIT_CONTACT", payload: { ...editContact, name, email, job, phone } });
      setEditContact(null);
    } else {
      dispatch({ type: "ADD_CONTACT", payload: { name, email, job, phone } });
    }
    setName(""); setEmail(""); setJob(""); setPhone("");
  };

  return (
    <div className="form-container">
      <input
        style={{ width: "90%" }}
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="نام"
      />
      <input
        style={{ width: "90%" }}
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="ایمیل"
      />
      <input
        style={{ width: "90%" }}
        value={job}
        onChange={e => setJob(e.target.value)}
        placeholder="شغل"
      />
      <input
        style={{ width: "90%" }}
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="شماره تلفن"
      />
      <button style={{ width: "90%" }} onClick={handleSubmit}>
        {editContact ? "ثبت ویرایش" : "افزودن"}
      </button>
      {editContact && (
        <button
          className="cancel-btn"
          style={{ width: "90%" }}
          onClick={() => setEditContact(null)}
        >
          لغو ویرایش
        </button>
      )}
      {error && (
        <div style={{ color: "#f87171", marginTop: 7, fontWeight: 600, textAlign: "center" }}>
          {error}
        </div>
      )}
    </div>
  );
}

export default AddContactForm;
