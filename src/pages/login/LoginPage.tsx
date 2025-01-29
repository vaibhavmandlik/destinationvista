import React, { useState } from 'react';
const url = `${import.meta.env.VITE_API_URL}/user/login`

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.data.accessToken);
        alert('Login successful!');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
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
          <button type="submit" className="btn btn-primary btn-block">Login</button>
          <p className="text-center mt-3">
            <a href="#">Forgot Password?</a>
          </p>
          <p className="text-center mt-2">Or login with</p>
          <div className="text-center">
            <button type="button" className="btn btn-outline-primary mr-2">
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
            <button type="button" className="btn btn-outline-danger">
              <i className="fab fa-google"></i> Google
            </button>
          </div>
          <p className="text-center mt-3">
            Don’t have an account? <a href="/registration">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
