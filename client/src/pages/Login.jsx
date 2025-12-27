import React, { useState } from "react";
import { useAuth } from "../auth/UseAuth";
import { Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow w-80">
          <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
          <input
            type="email"
            className="w-full p-2 border rounded mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-2 border rounded mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={()=>login(email,password)} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
          Already don't have an account?{" "}<Link className='text-blue-700' to='/register'>Register</Link>
         
        </div>
      </div>
    </>
  );
};

export default Login;
