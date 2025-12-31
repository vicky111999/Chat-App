import React from "react";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import { useAuth } from "./auth/UseAuth.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register.jsx";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <Routes>
            <Route path="/" element={!user ?<Login /> : <Navigate to="/chat" replace/>} />
            <Route path="/chat" element={user ? <Chat /> : <Navigate to='/' replace/>} />
            <Route path='/register' element={<Register/>} />
            <Route path="*" element={<Navigate to='/' replace />}/>
      </Routes>
    </>
  );
};

export default App;
