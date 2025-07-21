// client-side rendered page
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-4 py-2 rounded"
        />

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">Or login with</p>
        <div className="flex justify-center space-x-4 mt-2">
          <button onClick={() => signIn('google')} className="text-sm text-blue-600 underline">Google</button>
          <button onClick={() => signIn('facebook')} className="text-sm text-blue-600 underline">Facebook</button>
          <button onClick={() => signIn('apple')} className="text-sm text-blue-600 underline">Apple</button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
