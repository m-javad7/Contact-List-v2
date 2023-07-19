import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
const CONTACTS_API = "http://localhost:3000/contacts";

const InputField = ({ label, type, name, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        placeholder={label}
        type={type}
        name={name}
        value={value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={onChange}
      />
    </div>
  );
};

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState({ name: "", number: "" });
  const { name, number } = contact;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${CONTACTS_API}/${id}`);
      setContact(response.data);
      setLoading(false);
    } catch (error) {
      setError("An error occurred while fetching the contact.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || number.trim() === "") {
      alert("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      await axios.put(`${CONTACTS_API}/${id}`, contact);
      navigate("/");
    } catch (error) {
      setError("An error occurred while saving the contact.");
      setLoading(false);
    }
  };

  return (
    <>
        <div className="h-[100vh] flex flex-col items-center justify-center">

      {loading ? (
        <p className="font-bold text-3xl">Loading...</p>
      ) : error ? (
        <p className="text-red-600 text-sm">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-12 mb-4">
          <InputField label="Name" type="text" name="name" value={name} onChange={handleChange} />
          <InputField label="Phone Number" type="tel" name="number" value={number} onChange={handleChange} />

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
            <Link to="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Back
            </Link>
          </div>
        </form>
      )}
        </div>

    </>
  );
};

export default EditContact;
