import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (auth.login(email, password)) {
      navigate("/dashboard");
    } else {
      setModalIsOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-2 flex flex-col items-center justify-center min-h-screen shadow-2xl">
      <form onSubmit={handleSubmit} className="form w-full max-w-sm">
      <p className="text-4xl font-bold text-center mb-4 shadow-lg p-4 ">Login</p>
        <label htmlFor="email" style={{color: "gray"}}>Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" style={{color: "gray"}} >Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4">
          Login
        </button>
      </form>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Authentication Failed</h2>
        <p>Wrong email or password</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Login;
