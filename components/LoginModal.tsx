import React, { useState } from 'react';
import { X, LogIn, UserPlus } from 'lucide-react';
import { useAuthLogin, useAuthRegister } from '../src/generated/hooks/useAuth';
import { TokenManager } from '../api/config';

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
  const [showPassword, setShowPassword] = useState(false);

  // Helper function to parse API errors
  const getErrorMessage = (err: any): string => {
    if (err.body?.detail) {
      if (Array.isArray(err.body.detail)) {
        return err.body.detail.map((e: any) => e.msg || e.message).join(', ');
      }
      return err.body.detail;
    }
    if (err.message) return err.message;
    return isLogin ? 'Login failed. Please check your credentials.' : 'Registration failed. Please try again.';
  };

  // Reset form
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setError('');
    setShowPassword(false);
  };

  const loginMutation = useAuthLogin({
    onSuccess: (data) => {
      TokenManager.setToken(data.access_token);
      resetForm();
      onSuccess();
      onClose();
    },
    onError: (err: any) => {
      setError(getErrorMessage(err));
    }
  });

  const registerMutation = useAuthRegister({
    onSuccess: () => {
      // Auto login after registration
      loginMutation.mutate({ requestBody: { email, password } });
    },
    onError: (err: any) => {
      setError(getErrorMessage(err));
    }
  });

  // Reset error when switching between login/register
  React.useEffect(() => {
    setError('');
  }, [isLogin]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      loginMutation.mutate({ requestBody: { email, password } });
    } else {
      registerMutation.mutate({ requestBody: { email, username: email, password, full_name: fullName } });
    }
  };

  const loading = loginMutation.isPending || registerMutation.isPending;

  const cardClass = isDarkMode
    ? "bg-stone-900 border-stone-800"
    : "bg-white/10 border-white/20 backdrop-blur-xl";

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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border ${isDarkMode ? 'bg-stone-950 border-stone-800 text-white' : 'bg-black/20 border-white/10 text-white'} focus:outline-none focus:border-gold pr-12`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

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
