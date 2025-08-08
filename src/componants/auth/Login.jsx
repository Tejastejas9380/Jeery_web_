import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:5000/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const response = await axios.post('http://localhost:5000/auth/google', { tokenId: tokenResponse.access_token });
      localStorage.setItem('token', response.data.token);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 flex items-center justify-center"
    >
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <h2 className="text-white text-2xl mb-6 text-center">Login to Jerry AI</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <button type="submit" className="w-full bg-white text-black p-2 rounded">
            Login
          </button>
        </form>
        <button onClick={() => handleGoogleLogin()} className="w-full bg-blue-600 text-white p-2 rounded mt-4">
          Login with Google
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Login;