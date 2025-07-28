'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) setError('Invalid or missing token.');
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!token) return;

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || 'Something went wrong');

      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Unexpected error');
      } else {
        setError('Unexpected error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-2xl font-semibold text-blue-600 mb-10">
        Reset your password 🔒
      </h1>

      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg px-10 py-12 flex flex-col items-center">
        {!token ? (
          <p className="text-red-600 text-center">
            Invalid or missing reset token.
          </p>
        ) : success ? (
          <>
            <p className="text-green-600 text-center text-sm mb-6">
              ✅ Password reset successful.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="w-[200px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800"
            >
              Back to Login
            </button>
          </>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 flex flex-col items-center"
          >
            {error && (
              <p className="text-red-600 text-sm text-center w-full">
                {error}
              </p>
            )}
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="w-full border px-4 py-2 rounded-md"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-[200px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
