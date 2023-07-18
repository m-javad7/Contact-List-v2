import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
      fetchContacts();
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
            <div key={contact.id} className="flex items-center justify-between border-b py-2">
              <div>
                <p><span className="text-gray-400">Name:</span> {contact.name}</p>
                <p><span className="text-gray-400">Tell:</span> {contact.number}</p>
              </div>
              <div>
                <Link to={`/edit-contact/${contact.id}`} className="bg-blue-500 hover:bg-blue-400 text-neutral-50 rounded-md py-1 px-2 mr-2">
                  Edit
                </Link>
                <button onClick={() => deleteContact(contact.id)} className="bg-red-500 hover:bg-red-400 text-neutral-50 rounded-md py-1 px-2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ContactList;
