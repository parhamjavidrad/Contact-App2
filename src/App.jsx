import { ContactsProvider } from "./components/ContactsProvider";
import AddContactForm from "./components/AddContactForm";
import ContactsList from "./components/ContactsList";

function App() {
  return (
    <ContactsProvider>
      <h1>لیست مخاطبین</h1>
      <AddContactForm />
      <ContactsList />
    </ContactsProvider>
  );
}

export default App;
