import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';

const SignUp = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/userAuth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        navigate('/');
      } else {
        setError(data.message || 'Error signing up');
      }
    } catch (err) {
      setError('Network error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 relative overflow-hidden bg-gemini-dark text-slate-200">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gemini-purple rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
      
      <div className="z-10 w-full max-w-md glass-panel p-8 rounded-2xl border border-slate-700/50 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400 text-sm">Join InterviewIQ and start your journey.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gemini-cyan focus:ring-1 focus:ring-gemini-cyan transition-all"
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gemini-cyan focus:ring-1 focus:ring-gemini-cyan transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input
              type="text"
              name="userName"
              placeholder="Username"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gemini-cyan focus:ring-1 focus:ring-gemini-cyan transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gemini-cyan focus:ring-1 focus:ring-gemini-cyan transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gemini-cyan focus:ring-1 focus:ring-gemini-cyan transition-all"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-500 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-gemini-cyan focus:ring-1 focus:ring-gemini-cyan transition-all"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl gemini-gradient-bg text-white font-bold hover:opacity-90 transition-all flex items-center justify-center space-x-2 mt-4 disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>

        <p className="text-slate-400 text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-gemini-cyan hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
