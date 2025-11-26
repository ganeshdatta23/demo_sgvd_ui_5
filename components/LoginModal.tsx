import React, { useState } from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isDarkMode: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess, isDarkMode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { apiClient } = await import('../api/client');
      
      if (isLogin) {
        await apiClient.login(email, password);
      } else {
        await apiClient.register(email, password, fullName);
        await apiClient.login(email, password);
      }
      
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const cardClass = isDarkMode 
    ? 'bg-stone-900 border-stone-800' 
    : 'bg-white/10 border-white/20 backdrop-blur-xl';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className={`w-full max-w-md rounded-3xl border p-8 ${cardClass}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-display font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-stone-950 border-stone-800 text-white' : 'bg-black/20 border-white/10 text-white'} focus:outline-none focus:border-gold`}
              required
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-stone-950 border-stone-800 text-white' : 'bg-black/20 border-white/10 text-white'} focus:outline-none focus:border-gold`}
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-stone-950 border-stone-800 text-white' : 'bg-black/20 border-white/10 text-white'} focus:outline-none focus:border-gold`}
            required
          />

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-stone-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 transition-all disabled:opacity-50"
          >
            {loading ? 'Please wait...' : (
              <>
                {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                {isLogin ? 'Sign In' : 'Sign Up'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-white/60 hover:text-white"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
