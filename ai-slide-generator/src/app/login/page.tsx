// client-side rendered page
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid credentials');
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-2xl font-semibold text-blue-600 mb-10">Hi there 😁, Welcome 🎉!</h1>

      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl flex overflow-hidden">
        {/* Left: OAuth Section */}
        <div className="w-1/2 px-10 py-12 flex flex-col justify-start items-center space-y-4">
          <h2 className="text-xl font-semibold mb-2">Sign in for quick access 🔓</h2>

          <button
            onClick={() => signIn('facebook')}
            className="w-[275px] flex items-center justify-center gap-3 py-2 rounded-md bg-[#3b5998] text-white hover:bg-[#334d84]"
          >
            <FaFacebookF />
            Sign in with Facebook
          </button>

          <button
            onClick={() => signIn('google')}
            className="w-[275px] flex items-center justify-center gap-3 py-2 rounded-md bg-white border text-gray-700 hover:bg-gray-100"
          >
            <FcGoogle />
            Sign in with Google
          </button>

          <button
            onClick={() => signIn('apple')}
            className="w-[275px] flex items-center justify-center gap-3 py-2 rounded-md bg-zinc-900 text-white hover:bg-zinc-800"
          >
            <FaApple />
            Sign in with Apple
          </button>
        </div>

        {/* Center Divider */}
        <div className="w-px bg-gray-200" />

        {/* Right: Manual Login */}
        <div className="w-1/2 px-10 py-12 flex flex-col justify-start">
          <h2 className="text-xl font-semibold mb-6">Log in to your account 🔐</h2>
          <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center">
            <input
              type="email"
              placeholder="Username or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded-md"
            />

            <div className="flex items-center justify-between w-full text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-[275px] bg-blue-600 text-white py-2 rounded-md 
              bg-blue-600 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login with Email'}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-4">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

