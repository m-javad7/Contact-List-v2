import { useNavigate } from "react-router";
import ContactList from "../Components/ContactList";

const Home = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/new-contact");
  };
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg font-bold m-4">Contact List</h1>
        <button onClick={handleClick} className="bg-green-500 hover:bg-green-400 text-neutral-50 rounded-md py-1 px-2">Add Contact</button>
      </div>
      <div className="p-20">
        <ContactList />
      </div>
    </div>
  );
};

export default Home;
