import React from "react";
import { Link } from "react-router-dom";

const ContactItem = ({ contact, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      onDelete(contact.id);
    }
  };

  return (
    <div className="flex items-center justify-between border-b py-2">
      <div>
        <p>
          <span className="text-gray-400">Name:</span> {contact.name}
        </p>
        <p>
          <span className="text-gray-400">Tell:</span> {contact.number}
        </p>
      </div>
      <div>
        <Link
          to={`/edit-contact/${contact.id}`}
          className="bg-blue-500 hover:bg-blue-400 text-neutral-50 rounded-md py-1 px-2 mr-2"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-400 text-neutral-50 rounded-md py-1 px-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactItem;
