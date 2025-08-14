// client-side rendered page
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      setError(data.error || 'Something went wrong');
      return;
    }

    // Auto-login after registration
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />

        <div className="relative w-full">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-4 py-2 pr-10 rounded"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500 hover:text-black"
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700
          disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
