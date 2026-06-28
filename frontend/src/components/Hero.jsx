import React from 'react';
import { ChevronRight, Terminal, Code2, Cpu, Users, Globe2, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ isLoggedIn }) => {
  return (
    <div className="flex-1 flex flex-col bg-gemini-dark text-slate-200">
      
      {/* SECTION 1: HERO (Similar to Leetcode) */}
      <section className="relative flex items-center justify-center min-h-[85vh] px-6 lg:px-20 overflow-hidden">
        {/* Abstract Background Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gemini-purple rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gemini-cyan rounded-full mix-blend-screen filter blur-[150px] opacity-20"></div>
        
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
          
          {/* Left: Text Content */}
          <div className="flex flex-col items-start space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full gemini-border bg-slate-900/50 text-sm font-medium text-gemini-cyan">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gemini-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gemini-cyan"></span>
              </span>
              <span>The #1 platform for tech interviews</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              A New Way to <br/>
              <span className="gemini-gradient-text">Learn & Interview</span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
              InterviewIQ is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.
            </p>
            
            <Link to={isLoggedIn ? "/profile" : "/signup"} className="w-fit px-8 py-4 rounded-full gemini-gradient-bg text-white font-semibold text-lg hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(171,104,255,0.4)] flex items-center space-x-2">
              <span>{isLoggedIn ? "Go to Dashboard" : "Create Account"}</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Right: Abstract Graphic / Code Editor Mockup */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex justify-center items-center">
            {/* Inner glowing circle */}
            <div className="absolute w-3/4 h-3/4 rounded-full border border-slate-700/50 shadow-[inset_0_0_50px_rgba(171,104,255,0.2)] animate-spin-slow"></div>
            <div className="absolute w-2/3 h-2/3 rounded-full border border-gemini-blue/20 shadow-[0_0_40px_rgba(74,144,226,0.1)]"></div>
            
            {/* Floating Code Window */}
            <div className="relative w-[90%] max-w-md glass-panel rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
              {/* Header */}
              <div className="flex items-center px-4 py-3 border-b border-slate-700/50 bg-slate-900/80">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto flex items-center space-x-2 text-slate-400 text-xs font-mono">
                  <Terminal className="w-3 h-3" />
                  <span>twoSum.js</span>
                </div>
              </div>
              {/* Body */}
              <div className="p-6 font-mono text-sm sm:text-base leading-loose bg-[#0f1015]/90 text-slate-300">
                <p><span className="text-gemini-purple">function</span> <span className="text-gemini-cyan">twoSum</span>(nums, target) {'{'}</p>
                <p className="ml-4"><span className="text-gemini-purple">const</span> map = <span className="text-gemini-purple">new</span> <span className="text-gemini-cyan">Map</span>();</p>
                <p className="ml-4"><span className="text-gemini-purple">for</span> (<span className="text-gemini-purple">let</span> i = 0; i &lt; nums.length; i++) {'{'}</p>
                <p className="ml-8"><span className="text-gemini-purple">const</span> diff = target - nums[i];</p>
                <p className="ml-8"><span className="text-gemini-purple">if</span> (map.<span className="text-gemini-cyan">has</span>(diff)) {'{'}</p>
                <p className="ml-12"><span className="text-gemini-purple">return</span> [map.<span className="text-gemini-cyan">get</span>(diff), i];</p>
                <p className="ml-8">{'}'}</p>
                <p className="ml-8">map.<span className="text-gemini-cyan">set</span>(nums[i], i);</p>
                <p className="ml-4">{'}'}</p>
                <p>{'}'}</p>
                
                {/* Simulated cursor */}
                <div className="w-2 h-5 bg-gemini-cyan mt-4 animate-pulse"></div>
              </div>
            </div>
            
            {/* Floating badges */}
            <div className="absolute top-10 right-4 glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 animate-bounce-slow shadow-lg">
              <Code2 className="text-gemini-blue w-5 h-5" />
              <span className="font-semibold text-sm">3000+ Problems</span>
            </div>
            <div className="absolute bottom-10 left-0 glass-panel px-4 py-2 rounded-xl flex items-center space-x-2 animate-bounce-slow delay-150 shadow-lg">
              <Cpu className="text-gemini-purple w-5 h-5" />
              <span className="font-semibold text-sm">AI Assisted</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Explore / Content (Similar to Leetcode Explore) */}
      <section className="py-24 px-6 lg:px-20 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              <span className="text-gemini-cyan">Explore</span> is the right answer
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Not sure where to begin? Our curated Explore content will guide you through a structured learning path tailored to your goals. Whether you want to master data structures, learn a new framework, or crack the coding interview, we've got you covered.
            </p>
            <button className="px-6 py-3 rounded-full gemini-border text-white font-medium hover:bg-slate-800 transition-colors">
              Get Started
            </button>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
            <div className="glass-panel p-6 rounded-2xl border-t border-t-gemini-blue/50 transform hover:-translate-y-1 transition-all cursor-pointer">
              <Globe2 className="w-8 h-8 text-gemini-blue mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Top Interview 150</h3>
              <p className="text-sm text-slate-400">Must-do list for interview prep</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-t border-t-gemini-purple/50 transform hover:-translate-y-1 transition-all cursor-pointer">
              <Briefcase className="w-8 h-8 text-gemini-purple mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Top Companies</h3>
              <p className="text-sm text-slate-400">FAANG focused questions</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-t border-t-gemini-cyan/50 transform hover:-translate-y-1 transition-all cursor-pointer">
              <Cpu className="w-8 h-8 text-gemini-cyan mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">System Design</h3>
              <p className="text-sm text-slate-400">Architecture mastery</p>
            </div>
            <div className="glass-panel p-6 rounded-2xl border-t border-t-yellow-500/50 transform hover:-translate-y-1 transition-all cursor-pointer">
              <Users className="w-8 h-8 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">SQL 50</h3>
              <p className="text-sm text-slate-400">Database query prep</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Community & Companies */}
      <section className="py-24 px-6 lg:px-20 text-center flex flex-col items-center">
        <div className="max-w-3xl space-y-6 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Join the <span className="gemini-gradient-text">Community</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Connect with thousands of developers worldwide. Discuss problems, share solutions, and get hired by top companies.
          </p>
        </div>
        
        {/* Mockup for companies or stats */}
        <div className="flex flex-wrap justify-center gap-8 opacity-60">
           {/* Simple text representation of logos */}
           <div className="text-2xl font-bold tracking-tighter">Google</div>
           <div className="text-2xl font-bold tracking-tight">Meta</div>
           <div className="text-2xl font-bold italic">Amazon</div>
           <div className="text-2xl font-bold tracking-widest text-blue-500">Microsoft</div>
           <div className="text-2xl font-bold tracking-tighter text-red-500">Netflix</div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default Hero;
