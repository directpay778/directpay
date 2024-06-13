
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editContact, setEditContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  const handleDelete = async () => {
    await deleteDoc(doc(db, "contacts", contactToDelete.id));
    setContacts(contacts.filter((contact) => contact.id !== contactToDelete.id));
    setDeleteModalIsOpen(false);
    setContactToDelete(null);
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setEditModalIsOpen(true);
  };

  const handleUpdate = async () => {
    const { id, name, mobileNumber, amount, message } = editContact;
    await updateDoc(doc(db, "contacts", id), {
      name,
      mobileNumber,
      amount,
      message,
    });
    setContacts(
      contacts.map((contact) =>
        contact.id === id ? editContact : contact
      )
    );
    setEditModalIsOpen(false);
  };

  return (
    <div className="gradient-bg flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-4xl font-bold mb-8 bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg">
        Dashboard
      </h1>
      <div className=" bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Name
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Mobile Number
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Amount
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Message
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="bg-gray-700 bg-opacity-50 border border-grey-500 md:border-none block md:table-row hover:bg-gray-600"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {contact.name}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {contact.mobileNumber}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {contact.amount}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {contact.message}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left md:table-cell">
                  <div className="flex">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="bg-green-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setContactToDelete(contact);
                        setDeleteModalIsOpen(true);
                      }}
                      className="bg-blue-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editContact && (
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={() => setEditModalIsOpen(false)}
        >
          <h2 className="text-2xl mb-4">Edit Contact</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={editContact.name}
              onChange={(e) =>
                setEditContact({ ...editContact, name: e.target.value })
              }
              className="w-full mb-4 p-2"
            />
            <label className="block mb-2">Mobile Number</label>
            <input
              type="text"
              value={editContact.mobileNumber}
              onChange={(e) =>
                setEditContact({
                  ...editContact,
                  mobileNumber: e.target.value,
                })
              }
              className="w-full mb-4 p-2"
            />
            <label className="block mb-2">Amount</label>
            <input
              type="text"
              value={editContact.amount}
              onChange={(e) =>
                setEditContact({ ...editContact, amount: e.target.value })
              }
              className="w-full mb-4 p-2"
            />
            <label className="block mb-2">Message</label>
            <textarea
              value={editContact.message}
              onChange={(e) =>
                setEditContact({ ...editContact, message: e.target.value })
              }
              className="w-full mb-4 p-2"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded mr-2"
            >
              Update
            </button>
            <button
              onClick={() => setEditModalIsOpen(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </form>
        </Modal>
      )}
      {contactToDelete && (
        <Modal
          isOpen={deleteModalIsOpen}
          onRequestClose={() => setDeleteModalIsOpen(false)}
          
        >

          <div>
            <div>
          <h2 className="text-2xl mb-4">Confirm Deletion</h2>
          <p>Are you sure you want to delete this contact?</p>
          </div>
          
          <div className="mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteModalIsOpen(false)}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>

          </div>
          
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;














// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// const Dashboard = () => {
//   const [contacts, setContacts] = useState([]);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [editContact, setEditContact] = useState(null);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       const querySnapshot = await getDocs(collection(db, "contacts"));
//       const contactsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setContacts(contactsData);
//     };

//     fetchContacts();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteDoc(doc(db, "contacts", id));
//     setContacts(contacts.filter((contact) => contact.id !== id));
//   };

//   const handleEdit = (contact) => {
//     setEditContact(contact);
//     setModalIsOpen(true);
//   };

//   const handleUpdate = async () => {
//     const { id, name, mobileNumber, amount, message } = editContact;
//     await updateDoc(doc(db, "contacts", id), {
//       name,
//       mobileNumber,
//       amount,
//       message,
//     });
//     setContacts(
//       contacts.map((contact) =>
//         contact.id === id ? editContact : contact
//       )
//     );
//     setModalIsOpen(false);
//   };

//   return (
//     <div className="gradient-bg flex flex-col items-center justify-center text-white p-4">
//       <h1 className="text-4xl font-bold mb-8 bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg">
//         Dashboard
//       </h1>
//       <div className=" bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg overflow-x-auto">
//         <table className="min-w-full border-collapse block md:table">
//           <thead className="block md:table-header-group">
//             <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Name
//               </th>
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Mobile Number
//               </th>
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Amount
//               </th>
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Message
//               </th>
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="block md:table-row-group">
//             {contacts.map((contact) => (
//               <tr
//                 key={contact.id}
//                 className="bg-gray-700 bg-opacity-50 border border-grey-500 md:border-none block md:table-row hover:bg-gray-600"
//               >
//                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                   {contact.name}
//                 </td>
//                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                   {contact.mobileNumber}
//                 </td>
//                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                   {contact.amount}
//                 </td>
//                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                   {contact.message}
//                 </td>
//                 <td className=" p-2 md:border md:border-grey-500 text-left md:table-cell">
//                   <div className="flex"> 
//                   <button
//                     onClick={() => handleEdit(contact)}
//                     className="bg-green-500 text-white p-2 rounded mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(contact.id)}
//                     className="bg-blue-500 text-white p-2 rounded"
//                   >
//                     Delete
//                   </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {editContact && (
//         <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
//           <h2 className="text-2xl mb-4">Edit Contact</h2>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleUpdate();
//             }}
//           >
//             <label className="block mb-2">Name</label>
//             <input
//               type="text"
//               value={editContact.name}
//               onChange={(e) =>
//                 setEditContact({ ...editContact, name: e.target.value })
//               }
//               className="w-full mb-4 p-2"
//             />
//             <label className="block mb-2">Mobile Number</label>
//             <input
//               type="text"
//               value={editContact.mobileNumber}
//               onChange={(e) =>
//                 setEditContact({
//                   ...editContact,
//                   mobileNumber: e.target.value,
//                 })
//               }
//               className="w-full mb-4 p-2"
//             />
//             <label className="block mb-2">Amount</label>
//             <input
//               type="text"
//               value={editContact.amount}
//               onChange={(e) =>
//                 setEditContact({ ...editContact, amount: e.target.value })
//               }
//               className="w-full mb-4 p-2"
//             />
//             <label className="block mb-2">Message</label>
//             <textarea
//               value={editContact.message}
//               onChange={(e) =>
//                 setEditContact({ ...editContact, message: e.target.value })
//               }
//               className="w-full mb-4 p-2"
//             ></textarea>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white p-2 rounded mr-2"
//             >
//               Update
//             </button>
//             <button
//               onClick={() => setModalIsOpen(false)}
//               className="bg-gray-500 text-white p-2 rounded"
//             >
//               Cancel
//             </button>
//           </form>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default Dashboard;





























// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import '../styles.css';

// const Dashboard = () => {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       const querySnapshot = await getDocs(collection(db, "contacts"));
//       const contactsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setContacts(contactsData);
//     };

//     fetchContacts();
//   }, []);

//   return (
//     <div className="gradient-bg min-h-screen flex flex-col items-center justify-center text-white p-4">
//       <h1 className="text-4xl font-bold mb-8 bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg">
//         Dashboard
//       </h1>
//       <div className="w-full max-w-4xl bg-gray-800 bg-opacity-75 p-4 rounded-lg shadow-lg overflow-x-auto">
//         <table className="min-w-full border-collapse block md:table">
//           <thead className="block md:table-header-group">
//             <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Name
//               </th>
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Mobile Number
//               </th>
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Amount
//               </th>
//               <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//                 Message
//               </th>
//             </tr>
//           </thead>
//           <tbody className="block md:table-row-group">
//             {contacts.map((contact) => (
//               <tr
//                 key={contact.id}
//                 className="bg-gray-700 bg-opacity-50 border border-grey-500 md:border-none block md:table-row hover:bg-gray-600"
//               >
//                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                   {contact.name}
//                 </td>
//                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                   {contact.mobileNumber}
//                 </td>
//                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                   {contact.amount}
//                 </td>
//                 <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
//                   {contact.message}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;












// import React, { useEffect, useState } from "react";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";

// const Dashboard = () => {
//   const [contacts, setContacts] = useState([]);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       const querySnapshot = await getDocs(collection(db, "contacts"));
//       const contactsData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setContacts(contactsData);
//     };

//     fetchContacts();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
//       <table className="min-w-full border-collapse block md:table">
//         <thead className="block md:table-header-group">
//           <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative ">
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//               Name
//             </th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//               Mobile Number
//             </th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//               Amount
//             </th>
//             <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
//               Message
//             </th>
//           </tr>
//         </thead>
//         <tbody className="block md:table-row-group">
//           {contacts.map((contact) => (
//             <tr key={contact.id} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
//               <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{contact.name}</td>
//               <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{contact.mobileNumber}</td>
//               <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{contact.amount}</td>
//               <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">{contact.message}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;
