import React from 'react';
import { Link } from 'react-router-dom';
import { User, Code2, LogIn } from 'lucide-react';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between gemini-border border-x-0 border-t-0">
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg gemini-gradient-bg flex items-center justify-center text-white font-bold">
            IQ
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Interview<span className="gemini-gradient-text">IQ</span>
          </span>
        </Link>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-slate-300">
          <Link to="/problem" className="hover:text-white hover:text-gemini-cyan transition-colors">Problem</Link>
          <Link to="/content" className="hover:text-white hover:text-gemini-cyan transition-colors">Content</Link>
          <Link to="/interview" className="hover:text-white hover:text-gemini-cyan transition-colors">Interview</Link>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <Link to="/profile" className="w-10 h-10 rounded-full bg-gemini-darker gemini-border flex items-center justify-center hover:bg-slate-800 transition-colors">
            <User className="text-gemini-cyan w-5 h-5" />
          </Link>
        ) : (
          <>
            <Link to="/signin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/signup" className="text-sm font-medium px-4 py-2 rounded-lg gemini-gradient-bg text-white hover:opacity-90 transition-opacity flex items-center space-x-2">
              <span>Sign Up</span>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
