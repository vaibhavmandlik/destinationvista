import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../../LoginContext';

const url = `${import.meta.env.VITE_API_URL}/user/login`;

const UserLoginPage: React.FC = () => {
  const {setIsLogin} = useContext(LoginContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(url, { email, password });
      const accessToken  = response.data.data.accessToken;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('id',response.data.data.id);
      toast.success('Login successful!');
      setIsLogin(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (error: any) {
      console.error('Login error:', error);

      const message =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(`Login failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = email.trim() !== '' && password.trim() !== '';

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
        <h3 className="text-center text-primary mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={!isFormValid || loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center mt-3">
            <a href="#">Forgot Password?</a>
          </p>
          <p className="text-center mt-2">Or login with</p> 
          <p className="text-center mt-3">
            Don’t have an account? <a href="/registration">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLoginPage;
