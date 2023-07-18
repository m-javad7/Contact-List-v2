
const Contact = ({ name, number }) => {
  return (
    <div className="px-8 py-2">
        <div className="border p-2 rounded-md bg-slate-100 shadow-md hover:bg-slate-200 ">
      <p className="border-b-2 w-[20%]">Name: {name} </p>
      <p>Phone Number: {number}</p>
    </div>
    </div>
  );
};

export default Contact;
