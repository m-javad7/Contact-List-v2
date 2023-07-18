import ContactForm from "../Components/ContactForm";

const NewContact = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <h1 className="font-bold mb-4 text-neutral-500">New Contact</h1>
      <ContactForm />
    </div>
  );
};

export default NewContact;
