'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const res = await fetch('/api/auth/reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();
      console.log('[RESET REQUEST]', json);

      if (!res.ok) {
        throw new Error(json.message || 'Failed to send reset link');
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error('[RESET REQUEST ERROR]', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-2xl font-semibold text-blue-600 mb-10">
        Forgot your password? 🔒
      </h1>

      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg px-10 py-12 flex flex-col items-center">
        {!submitted ? (
          <>
            {error && (
              <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
            )}
            <p className="text-gray-700 mb-6 text-center">
              Enter your email and we'll send you a password reset link.
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full space-y-4 flex flex-col items-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border px-4 py-2 rounded-md"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-[200px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="text-green-600 text-center text-sm mb-6">
              ✅ If your email is registered, you’ll receive a password reset link shortly.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="w-[200px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
