import { useState, useEffect } from "react";
import axios from "axios";
import ContactItem from "./ContactItem";

const CONTACTS_API = "http://localhost:3000/contacts";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(CONTACTS_API);
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      setError("An error occurred while fetching the contacts.");
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    try {
      await axios.delete(`${CONTACTS_API}/${id}`);
      setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
    } catch (error) {
      setError("An error occurred while deleting the contact.");
    }
  };
  
  return (
    <div>
      {loading ? (
        <div className="w-full flex flex-col items-center justify-center">
          <p className="font-bold text-3xl">Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : (
        <>
          {contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} onDelete={deleteContact} />
          ))}
        </>
      )}
    </div>
  );
};

export default ContactList;
