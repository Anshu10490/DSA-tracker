import React, { useState } from 'react';
import '../App.css';

const LoginPage = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      if (isSignup) {
        localStorage.setItem('dsa_user', JSON.stringify(form));
        setIsSignup(false);
        setError('Account created! Please log in.');
        setForm({ name: '', email: '', password: '' });
      } else {
        const user = JSON.parse(localStorage.getItem('dsa_user'));
        if (user && user.email === form.email && user.password === form.password) {
          onLogin && onLogin();
        } else {
          setError('Invalid credentials');
        }
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Create Your Account' : 'Welcome Back'}</h2>

        {isSignup && (
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
        )}

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
            autoFocus={!isSignup}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="********"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && (
          <div className={`error-message ${error.includes('created') ? 'green' : 'red'}`}>
            {error}
          </div>
        )}

        <button type="submit" className="btn-login" disabled={loading}>
          {loading ? <span className="spinner"></span> : isSignup ? 'Sign Up' : 'Login'}
        </button>

        <div className="toggle-auth">
          {isSignup ? (
            <>
              Already have an account?
              <button type="button" onClick={() => { setIsSignup(false); setError(''); }}>
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?
              <button type="button" onClick={() => { setIsSignup(true); setError(''); }}>
                Create Account
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
