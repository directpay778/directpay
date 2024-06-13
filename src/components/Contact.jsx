import React, { useState } from "react";
import { contact } from "../assets";
import { layout } from "../style";
import "../index.css";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import Modal from "react-modal";

Modal.setAppElement('#root');

const Contact = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        mobileNumber,
        amount,
        message,
      });
      setLoader(false);
      setModalIsOpen(true);
      // alert("Your message has been submitted");
    } catch (error) {
      alert(error.message);
      setLoader(false);
    }

    setName("");
    setMobileNumber("");
    setAmount("");
    setMessage("");
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <section id="contact" className={layout.section}>
      <div className={layout.sectionInfo}>
        <img src={contact} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />
      </div>
      <div className={`${layout.sectionImg} flex-col`}>
        <form className="form" onSubmit={handleSubmit}>
          {/* <h1>Contact Us</h1> */}
          <label>Name</label>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label>Mobile Number</label>
          <input
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
            
          />
          <label>Amount</label>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <label>Message</label>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            type="submit"
            style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
          >
            Submit
          </button>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
          },
        }}
      >
        <h2>Thank You!</h2>
        <p>We will contact you soon.</p>
        <button onClick={closeModal} style={{ background: "rgb(2, 2, 110)", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Close</button>
      </Modal>
    </section>
  );
};

export default Contact;





// import React, { useState } from "react";
// import { contact } from "../assets";
// import { layout } from "../style";
// import "../index.css";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "../firebase";

// const Contact = () => {
//   const [name, setName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [loader, setLoader] = useState(false);

//   const handleSubmit = async (e) => {
//     console.log("form submitting");

//     e.preventDefault();
//     setLoader(true);

//     db.collection("contacts").addDoc({
//       name: name,
//       mobileNumber: mobileNumber,
//       amount: amount,
//       message: message,
//     })
//     .then(() => {
//       setLoader(false);
//       alert("Your message has been submitted👍");
//     })
//     .catch((error) => {
//       alert(error.message);
//       setLoader(false);
//     });

//   setName("");
//   setMobileNumber("");
//   setAmount("");
//   setMessage("");
//   console.log("submitted the form")
//   };

//   return (
//     <section id="features" className={layout.section}>
//       <div className={layout.sectionInfo}>
//         <img src={contact} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />
//       </div>
//       <div className={`${layout.sectionImg} flex-col`}>
//         <form className="form" onSubmit={handleSubmit}>
//           <h1>Contact Us</h1>
//           <label>Name</label>
//           <input
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <label>Mobile Number</label>
//           <input
//             placeholder="Mobile Number"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//           />
//           <label>Amount</label>
//           <input
//             placeholder="Amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//           <label>Message</label>
//           <textarea
//             placeholder="Message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           ></textarea>
//           <button
//             type="submit"
//             style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default Contact;
















// import React, { useState, useEffect } from "react";
// import {  contact } from "../assets";
// import { layout } from "../style";
// import "../index.css"
// import { db } from "../firebase";
// // import "../app.css";


// const Contact = () => {
//   const [name, setName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
  
  

//   const [loader, setLoader] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoader(true);

//     db.collection("contacts")
//       .add({
//         name: name,
//         // email: email,
//         mobileNumber: mobileNumber,
//         amount: amount,
//         message: message,
        
//       })
//       .then(() => {
//         setLoader(false);
//         alert("Your message has been submitted");
//       })
//       .catch((error) => {
//         alert(error.message);
//         setLoader(false);
//       });

//     setName("");
//     // setEmail("");
//     setMobileNumber("");
//     setAmount("");
//     setMessage("");
//   };

//   return (

//     <section id="features" className={layout.section}>
//     <div className={layout.sectionInfo}>
//     <img src={contact} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />
//     </div>

//     <div className={`${layout.sectionImg} flex-col`}>
//     <form className="form" onSubmit={handleSubmit} >
//       <h1>Contact Us </h1>

//       <label>Name</label>
//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <label>Mobile Number</label>
//       <input
//         placeholder="Mobile Number"
//         value={mobileNumber}
//         onChange={(e) => setMobileNumber(e.target.value)}
//       />
//       <label>Amount</label>
//       <input
//         placeholder="Amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <label>Message</label>
//       <textarea
//         placeholder="Message"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       ></textarea>

//       <button
//         type="submit"
//         style={{ background: loader ? "#ccc" : " rgb(2, 2, 110)" }}
//       >
//         Submit
//       </button>
//     </form>
      
//     </div>
//   </section>






    
//   );
// };

// export default Contact;