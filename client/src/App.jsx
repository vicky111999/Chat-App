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
        {!user ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Navigate to='/chat'/>} />
          </>
        )}
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </>
  );
};

export default App;
