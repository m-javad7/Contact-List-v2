import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import { InputField } from "./InputField";
const CONTACTS_API = "http://localhost:3000/contacts";

const ContactForm = () => {
  const [contact, setContact] = useState({ name: "", number: "" });
  const { name, number } = contact;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.trim() === "" || number.trim() === "") {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post(CONTACTS_API, contact);
      setContact({ name: "", number: "" });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <>
    
    <div className="w-full max-w-xs">
  <form 
  onSubmit={handleSubmit}
  className="bg-white shadow-md rounded p-12 mb-4">
      <InputField label="Name" type="text" name="name" value={name} onChange={handleChange} />
      <InputField label="Phone Number" type="number" name="number" value={number} onChange={handleChange} />

    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       type="submit">
        Add
      </button>
      <Link to="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">back to</Link>
      
    </div>
  </form>
</div>
</>
  );
  
};

export default ContactForm;
